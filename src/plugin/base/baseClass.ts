import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

/*
ROUTE TYPES
*/

export interface IBaseRoute<T extends AbstractBaseRoute> {
    base: T
}

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
        this.server.get("/all", fetchAll)
        this.server.get("/:id", fetchOne)
        this.server.post("/", create)
        this.server.put("/:id", update)
        this.server.delete("/:id", destroy)
    }
}

/*
CONTROLLER TYPES
*/

export interface IBaseController<T extends AbstractBaseController> {
    base: T
}

export abstract class AbstractBaseController {
    protected server: FastifyInstance

    constructor(server: FastifyInstance) {
        this.server = server
    }

    // CRUD
    public abstract create(request: FastifyRequest, reply: FastifyReply): void
    public abstract fetchAll(request: FastifyRequest, reply: FastifyReply): void
    public abstract fetchOne(request: FastifyRequest, reply: FastifyReply): void
    public abstract update(request: FastifyRequest, reply: FastifyReply): void
    public abstract destroy(request: FastifyRequest, reply: FastifyReply): void
}