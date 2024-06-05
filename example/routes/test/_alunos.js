import { useController } from 'diamond'
import { AlunosController } from '../../controller/index.js'
// import BaseController from './../../controller/base.js'

/**
 * @param {import("fastify").FastifyInstance} fastify 
 */
function route(fastify, opts, next) {
    useController(fastify, AlunosController)
    // useController(fastify, BaseController) Use if you don't use setupBase
    // fastify.get("/", (req, res) => res.status("200").send("abc")) Manual use
    next()
}

export { route as alunos }