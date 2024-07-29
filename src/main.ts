import chalk from "chalk";
import Fastify, { FastifyInstance, FastifyListenOptions, FastifyPluginCallback } from 'fastify';

import authPlugin from './plugin/auth.js';
import routesPlugin from './plugin/routes.js';
import { RouteController, RouteManager } from './route-manager.js';
import { AuthSign } from './types/geral.js';
import { RoutesOptions } from './types/routes.js';

const queue: RoutesOptions[] = []

interface DiamondOptions {
    prefix?: string,
    auth?: AuthSign,
}

interface Diamond extends FastifyListenOptions, DiamondOptions {}

export function start(options: Diamond) {
    options.port = options.port ?? 3333
    build(options).then(app => {
        app.listen(options, (err, addr) => {
            if (err) {
                app.log.error(err)
                process.exit(1)
            }
            // console.clear()
            console.log(`${chalk.cyan("♦️ Diamond Tool ♦️")}`)
            console.log(`${chalk.white("API is running in port:")} ${chalk.cyan(`${options.port}`)}`)
            console.log(`${chalk.white("Host to quick access:")} ${chalk.cyan(addr)}`)
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

const server: FastifyInstance = Fastify({ logger: true })

async function build(config?: DiamondOptions) {
    await server.register(authPlugin, config?.auth)
    await server.register(routesPlugin, { prefix: config?.prefix })
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