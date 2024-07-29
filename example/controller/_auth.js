import BaseController from "./base.js";

class AuthController extends BaseController {
    /**
     * @param {import("fastify").FastifyRequest} request
     * @param {import("fastify").FastifyReply} reply 
    */
    create(request, reply) {
        const token = request.server.useSign({ id: "abcbabc" })
        reply.status(201).send({ token })
    }
    
}

export default AuthController
export { AuthController }