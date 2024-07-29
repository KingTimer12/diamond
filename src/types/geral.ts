import { SignerOptions } from 'fast-jwt'
import { FastifyPluginCallback } from 'fastify'

declare module 'fastify' {
    export interface FastifyInstance {
        useRoute(path: string, callback: FastifyPluginCallback): void
        useSign(payload: { [key: string]: any }): string
        useVerify(token: string): { [key: string]: any }
    }
}

export type AuthSign = Partial<SignerOptions & {
    key: string;
}>

type ESClass = {
    prototype: unknown
}

export interface ESModule {
    default: ESClass
}