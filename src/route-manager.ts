import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from 'fastify'

const routes = new Set<{ path: string, callback: FastifyPluginCallback }>()

const RouteManager = () => {
    function useRoutePath() {
        // TODO
    }

    async function useRouteIndex(app: FastifyInstance, index: any) {
        await app.register(index)
    }
    
    async function useRouteSet(app: FastifyInstance) {
        const { registerRoutes } = RouteController()
        await app.register(registerRoutes)
    }

    return { useRouteIndex, useRoutePath, useRouteSet }
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