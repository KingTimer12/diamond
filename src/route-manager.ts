import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from 'fastify'
import { readdir } from 'node:fs/promises';
import { relative, join } from "node:path";
import { ESModule } from './types/geral';

const routes = new Set<{ path: string, callback: FastifyPluginCallback }>()

const RouteManager = () => {
    function useRoutePath() {
        // TODO
    }

    async function useRouteIndex(app: FastifyInstance, index: any) {
        await app.register(index)
    }

    async function useRouteManager(app: FastifyInstance, managerFile: string) {
        const mainDir = await readdir(managerFile, {
            recursive: false,
            withFileTypes: true,
        });

        console.log(mainDir)
        for (const archive of mainDir) {
            if (archive.isDirectory())
                await useRouteManager(app, join(managerFile, archive.name))
            else if (archive.isFile()) {
                if (archive.name.startsWith("_"))
                    return
                const path = relative(__dirname, managerFile);
                const file: ESModule = await import(join(path, archive.name))
                if (!file)
                    await useRouteSet(app)
            }
        }
    }
    
    async function useRouteSet(app: FastifyInstance) {
        const { registerRoutes } = RouteController()
        await app.register(registerRoutes)
    }

    return { useRouteIndex, useRoutePath, useRouteManager, useRouteSet }
}

const RouteController = () => {
    function addRoute(path: string, callback: FastifyPluginCallback) {
        routes.add({ path, callback })
        console.log(routes)
    }

    function registerRoutes (
        server: FastifyInstance,
        options: FastifyPluginOptions,
        done: () => void
    ) {
        // console.log(routes)
        for (const route of routes) {
            server.useRoute(route.path, route.callback)
        }
        routes.clear()
        done()
    }

    return { addRoute, registerRoutes }
}

export { RouteManager, RouteController }