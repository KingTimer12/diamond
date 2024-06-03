const { hello } = require("./test/hello_wold")

module.exports = function (fastify, opts, next) {
    fastify.useRoute('/test', hello)
    next()
}