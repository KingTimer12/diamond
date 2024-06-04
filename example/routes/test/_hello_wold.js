import { useBaseRoute } from 'diamond'
import BaseController from './../../controller/base.js'

/**
 * @param {import("fastify").FastifyInstance} fastify 
 */
function hello(fastify, opts, next) {
    useBaseRoute(BaseController, fastify)
    // fastify.get("/", (req, res) => res.status("200").send("abc"))
    next()
}

export { hello }