import { FastifyInstance } from 'fastify'

const RouteManager = () => {
    function useRoutePath() {
        // TODO
    }

    async function useRouteIndex(app: FastifyInstance, index: any) {
        await app.register(index)
    }

    return { useRouteIndex, useRoutePath }
}

export { RouteManager }