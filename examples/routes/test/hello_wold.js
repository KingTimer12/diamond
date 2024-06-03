function hello(fastify, opts, next) {
    fastify.get("/", (req, res) => {
        return res.status(200).send({ message: "hello world" })
    })

    next()
}

module.exports = { hello }