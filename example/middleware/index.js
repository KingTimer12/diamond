import { jwt } from 'diamond'

jwt((reply, next, token) => {
    if (!token)
        return reply.status(404).send({ message: "Token inválido!" })
    const data = reply.useVerify(token)
    console.log(data)
    next()
})