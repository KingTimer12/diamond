import { createSigner, createVerifier } from 'fast-jwt'
import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions, RouteHandlerMethod } from 'fastify'
import fp from 'fastify-plugin'
import { AuthSign, JWTRoutes } from '../types/geral'
import { JWTOptions } from '../types/routes'

function useSign(payload: { [key: string]: any }, sign: AuthSign) {
    const sync = createSigner(sign)
    return sync(payload)
}

function useVerify(token: string, key: string) {
    const sync = createVerifier({ key })
    return sync(token)
}

const routesJWT: {route: string, method: string}[] = []

function useJWT(server: FastifyInstance): JWTRoutes {

    function post(route: string, handler: RouteHandlerMethod) {
        routesJWT.push({ route: `${server.prefix}${route}`, method: "POST" })
        server.post(route, handler)
    }

    function put(route: string, handler: RouteHandlerMethod) {
        routesJWT.push({ route: `${server.prefix}${route}`, method: "PUT" })
        server.put(route, handler)
    }

    function options(route: string, handler: RouteHandlerMethod) {
        routesJWT.push({ route: `${server.prefix}${route}`, method: "OPTIONS" })
        server.options(route, handler)
    }

    function get(route: string, handler: RouteHandlerMethod) {
        routesJWT.push({ route: `${server.prefix}${route}`, method: "GET" })
        server.get(route, handler)
    }

    function deleteFunc(route: string, handler: RouteHandlerMethod) {
        routesJWT.push({ route: `${server.prefix}${route}`, method: "DELETE" })
        server.delete(route, handler)
    }

    function register(useJwt: JWTOptions) {
        console.log(routesJWT)
        server.addHook('preHandler', (req, res, next) => {
            if (!routesJWT.find(f => f.route === req.routeOptions.url && f.method === req.method))
                return next()
            const token = req.headers.authorization
            useJwt?.callback(res, next, token)
        })
    }

    return {
        post,
        register,
        get,
        put,
        options,
        delete: deleteFunc
    }
}

const Auth: FastifyPluginCallback<AuthSign> = (
    server: FastifyInstance,
    options: FastifyPluginOptions,
    done
) => {
    server.decorateRequest('useSign', (payload: { [key: string]: any }): string => {
        return useSign(payload, options)
    })
    server.decorateReply('useVerify', (token: string): { [key: string]: any } => {
        return useVerify(token, options.key)
    })
    server.decorate('jwt', (server: FastifyInstance) => useJWT(server))

    done()
}

export default fp(Auth, {
    name: "auth-diamond",
    fastify: '4.x'
})