import BaseController from './../../controller/base.js'

/**
 * @param {import("fastify").FastifyInstance} fastify 
 */
function hello(fastify, opts, next) {
    fastify.setupBase(BaseController,)
    // fastify.get("/", (req, res) => res.status(200).send("abc"))

    next()
}

export { hello }