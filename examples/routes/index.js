const { useRoute } = require("diamond")
const { hello } = require("./test/hello_wold")

useRoute('/hello', hello)

// module.exports = function (fastify, opts, next) {
//     fastify.useRoute('/test', hello)
//     next()
// }