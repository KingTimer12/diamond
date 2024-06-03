import { FastifyPluginCallback } from 'fastify'
import { AbstractBaseController, AbstractBaseRoute } from '../plugin/base/baseClass'

declare module 'fastify' {
    export interface FastifyInstance {
        useRoute(path: string, callback: FastifyPluginCallback): void
        setupBase<T extends AbstractBaseRoute, K extends AbstractBaseController> (controller: new () => K, secutiry?: boolean, route?: new (server: FastifyInstance) => T): void
    }
}

export interface ESModule {
    default: unknown
}