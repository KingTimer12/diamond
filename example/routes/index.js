import { useRoute } from "diamond"
import { hello } from "./test"

useRoute('/hello', hello)

// module.exports = function (fastify, opts, next) {
//     fastify.useRoute('/test', hello)
//     next()
// }