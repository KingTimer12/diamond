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
CLASS FATHER
*/

interface DiamondTools {}

/*
ROUTE TYPES
*/

export abstract class AbstractBaseRoute implements DiamondTools {
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

export abstract class AbstractBaseController implements DiamondTools {
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

/*
EXTERN FUNCTIONS
*/

export function useController<R extends AbstractBaseRoute, C extends AbstractBaseController> 
    (server: FastifyInstance, controller?: new () => C, secutiry: boolean = false, route?: new (server: FastifyInstance) => R) {
        const RouteDefaultClass = baseDefault.route ? baseDefault.route() : BaseRoute
        console.log(RouteDefaultClass)
        const routeInstance = createInstance(route, server)
        const ControllerDefaultClass = baseDefault.controller && baseDefault.controller()
        if (!controller && ControllerDefaultClass)
            routeInstance.setup(ControllerDefaultClass, secutiry)
        else if (controller)
            routeInstance.setup(controller, secutiry)
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

function createInstance<Tools extends DiamondTools>(tool?: new (...params: any) => Tools, ...params: any): Tools {
    if (!tool)
        throw Error("Tool can't be undefined or null.")
    return new tool(...params)
}