import { FastifyPluginCallback } from 'fastify'

declare module 'fastify' {
    export interface FastifyInstance {
        useRoute(path: string, callback: FastifyPluginCallback): void
        auth: {
            sign(payload: { [key: string]: any }): string
            verify(token: string): { [key: string]: any }
        }
    }
}

type ESClass = {
    prototype: unknown
}

export interface ESModule {
    default: ESClass
}