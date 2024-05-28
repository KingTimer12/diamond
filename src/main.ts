import Fastify, { FastifyInstance, RouteShorthandOptions, FastifyListenOptions } from 'fastify'

import { RoutesOptions } from './types/routes'
import { RouteManager } from './route-manager'
import routesPlugin from './plugin/routes'

const server: FastifyInstance = Fastify()

export async function start(options: FastifyListenOptions) {
    try {
        options.port = options.port ?? 3333
        server.listen(options, () => {
            console.log(`Diamond running in port: ${options.port}`)
            console.log(`Host: http://${options.host}:${options.port}`)
        })
        server.register(routesPlugin)

    } catch (err) {
        server.log.error(err)
    }
}

export async function routes(options: RoutesOptions) {
    const { useRouteIndex } = RouteManager()
    if (options.index) {
        useRouteIndex(server, options.index)
    }
}