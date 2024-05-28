import { FastifyInstance } from 'fastify'

const RouteManager = () => {
    function useRoutePath() {
        // TODO
    }

    function useRouteIndex(app: FastifyInstance, index: any) {
        app.register(index)
    }

    return { useRouteIndex, useRoutePath }
}

const RouteController = () => {
    
}

export { RouteManager }