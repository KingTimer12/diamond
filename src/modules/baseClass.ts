import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { JWTRoutes } from "../types/geral";

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

interface IBaseRoute extends DiamondTools {
    setup<C extends AbstractBaseController>(controller: C, secutiry?: boolean): void
}

interface IBaseController extends DiamondTools {
    create(request: FastifyRequest, reply: FastifyReply): void
    fetchAll(request: FastifyRequest, reply: FastifyReply): void
    fetchOne(request: FastifyRequest, reply: FastifyReply): void
    update(request: FastifyRequest, reply: FastifyReply): void
    destroy(request: FastifyRequest, reply: FastifyReply): void
}

/*
ROUTE TYPES
*/

export abstract class AbstractBaseRoute implements IBaseRoute {
    protected server: FastifyInstance

    constructor(server: FastifyInstance) {
        this.server = server
    }

    protected jwt(): JWTRoutes {
        return this.server.jwt(this.server)
    }

    public abstract setup<C extends AbstractBaseController>(controller: C, secutiry?: boolean): void
}

export class BaseRoute extends AbstractBaseRoute {
    setup<C extends AbstractBaseController>({ fetchAll, fetchOne, create, update, destroy }: C, secutiry?: boolean): void {
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

export abstract class AbstractBaseController implements IBaseController {

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
    (server: FastifyInstance, controller?: new () => C, secutiry?: boolean, route?: new (server: FastifyInstance) => R) {
        const RouteClass = route ?? (baseDefault.route ? baseDefault.route() : BaseRoute)
        const routeInstance = createInstance(RouteClass, server)
        const ControllerDefaultClass = controller ?? (baseDefault.controller ? baseDefault.controller() : EmptyBaseController)
        const controllerInstance = createInstance(ControllerDefaultClass)

        routeInstance.setup(controllerInstance, secutiry)
        return controllerInstance
}

export function setupBase(options: IBaseDefault) {
    if (options.controller && options.route != baseDefault.route)
        baseDefault = options
    else if (options.controller)
        baseDefault.controller = options.controller
    else if (options.route != baseDefault.route)
        baseDefault.route = options.route
}

function createInstance<Tools extends DiamondTools>(tool?: new (...params: any) => Tools, ...params: any): Tools {
    if (!tool)
        throw Error("Tool can't be undefined or null.")
    return new tool(...params)
}