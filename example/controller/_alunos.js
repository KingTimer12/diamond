import BaseController from "./base.js";

class AlunosController extends BaseController {
    /**
     * @param {import("fastify").FastifyRequest} request
     * @param {import("fastify").FastifyReply} reply 
    */
    create(request, reply) {
        reply.status(201).send('Alunos created!')
    }

    /**
     * @param {import("fastify").FastifyRequest} request
     * @param {import("fastify").FastifyReply} reply 
    */
    fetchAll(request, reply) {
        return reply.status(200).send('fetchAll Alunos')
    }

    /**
     * @param {import("fastify").FastifyRequest} request
     * @param {import("fastify").FastifyReply} reply 
    */
    fetch(request, reply) {
        return reply.status(200).send('fetch')
    }
}

export default AlunosController
export { AlunosController }