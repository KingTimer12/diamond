import { SignerOptions } from 'fast-jwt'
import { FastifyInstance, FastifyPluginCallback, RouteHandlerMethod } from 'fastify'
import { JWTOptions } from './routes'

export interface JWTRoutes {
    post: (url: string, handler: RouteHandlerMethod) => void,
    get: (url: string, handler: RouteHandlerMethod) => void,
    delete: (url: string, handler: RouteHandlerMethod) => void,
    options: (url: string, handler: RouteHandlerMethod) => void,
    put: (url: string, handler: RouteHandlerMethod) => void,
    register: (useJwt: JWTOptions) => void
}

declare module 'fastify' {
    export interface FastifyInstance {
        useRoute(path: string, callback: FastifyPluginCallback): void
        useSign(payload: { [key: string]: any }): string
        useVerify(token: string): { [key: string]: any },
        jwt(server: FastifyInstance): JWTRoutes
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