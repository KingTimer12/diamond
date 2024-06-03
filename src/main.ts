import Fastify, { FastifyInstance, FastifyListenOptions } from 'fastify'
import chalk from "chalk";

import { RoutesOptions } from './types/routes'
import { RouteManager } from './route-manager'
import routesPlugin from './plugin/routes'

const queue: RoutesOptions[] = []

export function start(options: FastifyListenOptions) {
    options.port = options.port ?? 3333
    build().then(app => {
        app.listen(options, () => {
            console.clear()
            console.log(`${chalk.cyan("♦️ Diamond Tool ♦️")}`)
            console.log(`${chalk.white("API is running in port:")} ${chalk.cyan(`${options.port}`)}`)
            console.log(`${chalk.white("Host to quick access:")} ${chalk.cyan(`http://${options.host}:${options.port}`)}`)
        })
    })
}

export function routes(options: RoutesOptions): void {
    queue.push(options)
}

/**
 * PRIVATE FUNC & VAR
*/

const server: FastifyInstance = Fastify()

async function build() {
    await server.register(routesPlugin)
    for (const q of queue) {
        await createRoutes(q)
    }
    await server.ready()
    return server
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