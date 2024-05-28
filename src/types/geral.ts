import { FastifyPluginCallback } from 'fastify'

declare module 'fastify' {
    export interface FastifyInstance {
        useRoute(path: string, callback: FastifyPluginCallback): void
    }
}