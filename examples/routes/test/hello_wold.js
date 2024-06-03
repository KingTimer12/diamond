/**
 * 
 * @param {import("fastify").FastifyInstance} fastify 
 */
function hello(fastify, opts, next) {
    // fastify.setupBase()
    fastify.get("/", null)

    next()
}

module.exports = { hello }