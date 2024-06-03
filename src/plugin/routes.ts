import fastify, { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'

interface RoutesOptions {
    prefix?: string
}

function useRoute(server: FastifyInstance, path: string, callback: FastifyPluginCallback, prefix?: string) {
    const finalPath = prefix ? prefix.replace(`/`, ``).concat(path.replace(`/`, ``)) : path.replace(`/`, ``)
    server.register(callback, { prefix: finalPath })
}

const Routes: FastifyPluginCallback<RoutesOptions> = (
    server: FastifyInstance,
    options: FastifyPluginOptions,
    done
) => {
    server.decorate('useRoute', (path: string, callback: FastifyPluginCallback): void => {
        useRoute(server, path, callback, options.prefix)
    })

    done()
}

export default fp(Routes)