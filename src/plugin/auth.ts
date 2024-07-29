import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import { createSigner, createVerifier, SignerOptions } from 'fast-jwt'
import { AuthSign } from '../types/geral'

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
    server.decorate('useSign', (payload: { [key: string]: any }): string => {
        return useSign(payload, options)
    })
    server.decorate('useVerify', (token: string): { [key: string]: any } => {
        return useVerify(token, options.key)
    })

    done()
}

export default fp(Auth)