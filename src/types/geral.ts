import { FastifyPluginCallback } from 'fastify'

declare module 'fastify' {
    export interface FastifyInstance {
        useRoute(path: string, callback: FastifyPluginCallback): void
    }
}

type ESClass = {
    prototype: unknown
}

export interface ESModule {
    default: ESClass
}