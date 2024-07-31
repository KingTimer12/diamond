import { jwt } from 'diamond'

jwt((server, reply, next, token) => {
    if (!token)
        return reply.status(404).send({ message: "Token inválido!" })
    const data = server.useVerify(token)
    console.log(data)
    next()
})