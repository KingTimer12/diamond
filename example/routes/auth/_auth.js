import { useController } from 'diamond'
import { AuthController } from '../../controller/index.js'
// import BaseController from './../../controller/base.js'

/**
 * @param {import("fastify").FastifyInstance} fastify 
 */
function route(fastify, opts, next) {
    const { create } = useController(fastify, AuthController)
    fastify.get("/token", create)
    next()
}

export { route as auth }