import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

interface AbstractBaseRoute {
    setup<C extends AbstractBaseController>(controller: C, secutiry?: boolean): void
}

interface AbstractBaseController {
    create(request: FastifyRequest, reply: FastifyReply): void
    fetchAll(request: FastifyRequest, reply: FastifyReply): void
    fetchOne(request: FastifyRequest, reply: FastifyReply): void
    update(request: FastifyRequest, reply: FastifyReply): void
    destroy(request: FastifyRequest, reply: FastifyReply): void
}

interface IBaseDefault<R extends AbstractBaseRoute, C extends AbstractBaseController> {
    route?: (server: FastifyInstance) => R,
    controller?: () => C
}