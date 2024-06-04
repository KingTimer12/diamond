import fastify, { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import { AbstractBaseController, AbstractBaseRoute, BaseRoute, IBaseController } from './base/baseClass.js'

interface RoutesOptions {
    prefix?: string
}

const Routes: FastifyPluginCallback<RoutesOptions> = (
    server: FastifyInstance,
    options: FastifyPluginOptions,
    done
) => {
    server.decorate('setupBase', 
        <R extends AbstractBaseRoute, C extends AbstractBaseController> 
            (controller: new () => C, secutiry: boolean = false, route?: new (server: FastifyInstance) => R): void => {
        const instance = route ? new route(server) : new BaseRoute(server)
        instance.setup(controller, secutiry)
    })

    done()
}

export default fp(Routes)