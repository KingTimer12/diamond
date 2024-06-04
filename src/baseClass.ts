import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

interface IBaseDefault<R extends AbstractBaseRoute = BaseRoute, C extends AbstractBaseController = EmptyBaseController> {
    route?: () => new (server: FastifyInstance) => R,
    controller?: () => new () => C
}

var baseDefault: IBaseDefault = {
    route() {
        return BaseRoute
    },
    controller() {
        return EmptyBaseController
    },
}

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

export class EmptyBaseController extends AbstractBaseController {
    public create(request: FastifyRequest, reply: FastifyReply): void {
        reply.status(404).send('Method not implemented.')
    }
    public fetchAll(request: FastifyRequest, reply: FastifyReply): void {
        reply.status(404).send('Method not implemented.')
    }
    public fetchOne(request: FastifyRequest, reply: FastifyReply): void {
        reply.status(404).send('Method not implemented.')
    }
    public update(request: FastifyRequest, reply: FastifyReply): void {
        reply.status(404).send('Method not implemented.')
    }
    public destroy(request: FastifyRequest, reply: FastifyReply): void {
        reply.status(404).send('Method not implemented.')
    }
}

export function useBaseRoute<R extends AbstractBaseRoute, C extends AbstractBaseController> 
    (server: FastifyInstance, controller?: new () => C, secutiry: boolean = false, route?: new (server: FastifyInstance) => R): void {
        const RouteDefaultClass = baseDefault.route ? baseDefault.route() : BaseRoute
        console.log(RouteDefaultClass)
        const instance = route ? new route(server) : new RouteDefaultClass(server)
        const ControllerDefaultClass = baseDefault.controller && baseDefault.controller()
        if (!controller && ControllerDefaultClass)
            instance.setup(ControllerDefaultClass, secutiry)
        else if (controller)
            instance.setup(controller, secutiry)
}

export function setupBase(options: IBaseDefault) {
    console.log(options.controller && options.route != baseDefault.route)
    if (options.controller && options.route != baseDefault.route)
        baseDefault = options
    else if (options.controller)
        baseDefault.controller = options.controller
    else if (options.route != baseDefault.route)
        baseDefault.route = options.route
    console.log(baseDefault)
}