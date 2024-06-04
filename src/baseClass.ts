import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

/*
ROUTE TYPES
*/

export abstract class AbstractBaseRoute {
    protected server: FastifyInstance

    constructor(server: FastifyInstance) {
        this.server = server
    }

    abstract setup<C extends AbstractBaseController>(controller: new () => C, secutiry: boolean): void
}

export class BaseRoute extends AbstractBaseRoute {
    setup<C extends AbstractBaseController>(controller: new () => C): void {
        const { fetchAll, fetchOne, create, update, destroy } = new controller()
        this.server.get("/", fetchAll)
        this.server.get("/:id", fetchOne)
        this.server.post("/", create)
        this.server.put("/:id", update)
        this.server.delete("/:id", destroy)
    }
}

/*
CONTROLLER TYPES
*/

export abstract class AbstractBaseController {
    // CRUD
    public abstract create(request: FastifyRequest, reply: FastifyReply): void
    public abstract fetchAll(request: FastifyRequest, reply: FastifyReply): void
    public abstract fetchOne(request: FastifyRequest, reply: FastifyReply): void
    public abstract update(request: FastifyRequest, reply: FastifyReply): void
    public abstract destroy(request: FastifyRequest, reply: FastifyReply): void
}

export function useBaseRoute<R extends AbstractBaseRoute, C extends AbstractBaseController> 
    (controller: new () => C, server: FastifyInstance, secutiry: boolean = false, route?: new (server: FastifyInstance) => R): void {
        const instance = route ? new route(server) : new BaseRoute(server)
        instance.setup(controller, secutiry)
}