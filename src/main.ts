import Fastify, { FastifyInstance, FastifyListenOptions, FastifyPluginCallback } from 'fastify'
import chalk from "chalk";

import { RoutesOptions } from './types/routes'
import { RouteManager, RouteController } from './route-manager'
import routesPlugin from './plugin/routes'
import baseRoutesPlugin from './plugin/baseRoutes'

const queue: RoutesOptions[] = []

export function start(options: FastifyListenOptions) {
    options.port = options.port ?? 3333
    build().then(app => {
        app.listen(options, () => {
            // console.clear()
            console.log(`${chalk.cyan("♦️ Diamond Tool ♦️")}`)
            console.log(`${chalk.white("API is running in port:")} ${chalk.cyan(`${options.port}`)}`)
            console.log(`${chalk.white("Host to quick access:")} ${chalk.cyan(`http://${options.host}:${options.port}`)}`)
        })
    })
}

export function routes(options: RoutesOptions): void {
    console.log(options)
    if (!options)
        queue.push(options)
}

export function useRoute(path: string, callback: FastifyPluginCallback): void {
    const { addRoute } = RouteController()
    console.log("use")
    addRoute(path, callback)
}

/**
 * PRIVATE FUNC & VAR
*/

const server: FastifyInstance = Fastify()

async function build() {
    await server.register(routesPlugin)
    await server.register(baseRoutesPlugin)
    console.log(queue)
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
    // console.log(options)
    if (options?.index) {
        await useRouteIndex(server, options.index)
    } else if (options?.managerFile) {
        await useRouteManager(server, options.managerFile)
    } else {
        await useRouteSet(server)
    }
}