import Fastify, { FastifyInstance, FastifyListenOptions, FastifyPluginCallback } from 'fastify'
import chalk from "chalk";

import { RoutesOptions } from './types/routes.js'
import { RouteManager, RouteController } from './route-manager.js'
import routesPlugin from './plugin/routes.js'

const queue: RoutesOptions[] = []

export function start(options: FastifyListenOptions) {
    options.port = options.port ?? 3333
    build().then(app => {
        app.printRoutes()
        app.listen(options, () => {
            // console.clear()
            console.log(`${chalk.cyan("♦️ Diamond Tool ♦️")}`)
            console.log(`${chalk.white("API is running in port:")} ${chalk.cyan(`${options.port}`)}`)
            console.log(`${chalk.white("Host to quick access:")} ${chalk.cyan(`http://${options.host}:${options.port}`)}`)
        })
    })
}

export function routes(options: RoutesOptions): void {
    if (options)
        queue.push(options)
}

export function useRoute(path: string, callback: FastifyPluginCallback): void {
    const { addRoute } = RouteController()
    addRoute(path, callback)
}

/**
 * PRIVATE FUNC & VAR
*/

const server: FastifyInstance = Fastify()

async function build() {
    await server.register(routesPlugin)
    if (queue.length)
        for (const q of queue)
            await createRoutes(q)
    else
        await createRoutes()
    await server.ready()
    return server
}

async function createRoutes(options?: RoutesOptions) {
    if (!server.useRoute)
        return
    const { useRouteIndex, useRouteManager, useRouteSet } = RouteManager()
    if (options?.index) {
        await useRouteIndex(server, options.index)
    } else if (options?.managerFile) {
        await useRouteManager(server, options.managerFile)
    } else {
        await useRouteSet(server)
    }
}