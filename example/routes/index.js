import { useRoute } from "diamond"
import { hello, alunos } from "./test/index.js"

useRoute('/hello', hello)
useRoute('/alunos', alunos)

// module.exports = function (fastify, opts, next) {
//     fastify.useRoute('/test', hello)
//     next()
// }