import { FastifyInstance, FastifyReply, HookHandlerDoneFunction } from 'fastify';
export type RoutesOptions = {
    path?: string,
    managerFile?: string,
    index?: any
}

export type JWTOptions = {
    callback: (server: FastifyInstance, reply: FastifyReply, next: HookHandlerDoneFunction, token?: string) => void
}