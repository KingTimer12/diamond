import Fastify, { FastifyInstance, FastifyListenOptions } from 'fastify'

import { RoutesOptions } from './types/routes'
import { RouteManager } from './route-manager'
import routesPlugin from './plugin/routes'

const server: FastifyInstance = Fastify()
const queue: RoutesOptions[] = []

async function build() {
    await server.register(routesPlugin)
    for (const q of queue) {
        await createRoutes(q)
    }
    await server.ready()
    return server
}

export function start(options: FastifyListenOptions) {
    try {
        options.port = options.port ?? 3333
        build().then(app => {
            app.listen(options, () => {
                console.log(`Diamond running in port: ${options.port}`)
                console.log(`Host: http://${options.host}:${options.port}`)
            })
        })
    } catch (err) {
        server.log.error(err)
        console.error(err)
    }
}

export function routes(options: RoutesOptions): void {
    queue.push(options)
}

async function createRoutes(options: RoutesOptions) {
    if (!server.useRoute) {
        return
    }
    const { useRouteIndex } = RouteManager()
    if (options.index) {
        await useRouteIndex(server, options.index)
    }
}