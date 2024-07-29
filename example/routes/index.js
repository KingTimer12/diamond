import { useRoute } from "diamond"
import { hello, alunos } from "./test/index.js"
import { auth } from './auth/index.js'

useRoute('/hello', hello)
useRoute('/alunos', alunos)
useRoute('/auth', auth)

// module.exports = function (fastify, opts, next) {
//     fastify.useRoute('/test', hello)
//     next()
// }