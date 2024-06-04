import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from 'fastify'
import { readdir } from 'node:fs/promises';
import { relative, join } from "node:path";
import { ESModule } from './types/geral.js';

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

        for (const archive of mainDir) {
            if (archive.isDirectory())
                await useRouteManager(app, join(managerFile, archive.name))
            else if (archive.isFile()) {
                if (archive.name.startsWith("_"))
                    return
                if (!(archive.name.endsWith(".js") || archive.name.endsWith(".ts")))
                    continue
                const dir = relative(__dirname, managerFile)
                const path = join(dir, archive.name)
                const file: ESModule = await import(path)
                if (file) {
                    await useRouteSet(app)
                    break
                }
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
    }

    function registerRoutes (
        server: FastifyInstance,
        options: FastifyPluginOptions,
        done: () => void
    ) {
        for (const route of routes) {
            server.useRoute(route.path, route.callback)
        }
        routes.clear()
        done()
    }

    return { addRoute, registerRoutes }
}

export { RouteManager, RouteController }