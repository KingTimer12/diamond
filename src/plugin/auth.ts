import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import { createSigner, createVerifier, SignerOptions } from 'fast-jwt'

type AuthSign = SignerOptions

function useSign(payload: { [key: string]: any }, sign: AuthSign) {
    const sync = createSigner(sign)
    return sync(payload)
}

function useVerify(token: string, key: string) {
    const sync = createVerifier({ key })
    return sync(token)
}

const Auth: FastifyPluginCallback<AuthSign> = (
    server: FastifyInstance,
    options: FastifyPluginOptions,
    done
) => {
    server.decorate('auth.sign', (payload: { [key: string]: any }): string => {
        return useSign(payload, options)
    })
    server.decorate('auth.verify', (token: string): string => {
        return useVerify(token, options.key)
    })

    done()
}

export default fp(Auth)