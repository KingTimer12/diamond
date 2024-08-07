import { AbstractBaseController } from "diamond"

class BaseController extends AbstractBaseController {
    
    /**
     * @param {import("fastify").FastifyRequest} request
     * @param {import("fastify").FastifyReply} reply 
    */
    create(request, reply) {
        return reply.status(201).send('Create')
    }

    /**
     * @param {import("fastify").FastifyRequest} request
     * @param {import("fastify").FastifyReply} reply 
    */
    fetchAll(request, reply) {
        return reply.status(200).send('fetchAll Base')
    }

    /**
     * @param {import("fastify").FastifyRequest} request
     * @param {import("fastify").FastifyReply} reply 
    */
    fetchOne(request, reply) {
        return reply.status(200).send('fetchOne')
    }

    /**
     * @param {import("fastify").FastifyRequest} request
     * @param {import("fastify").FastifyReply} reply 
    */
    update(request, reply) {
        return reply.status(200).send('update')
    }

    /**
     * @param {import("fastify").FastifyRequest} request
     * @param {import("fastify").FastifyReply} reply 
    */
    destroy(request, reply) {
        return reply.status(204).send()
    }
}

export default BaseController
export { BaseController }