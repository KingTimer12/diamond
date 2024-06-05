import { AbstractBaseRoute } from "diamond"

export default class CustomBaseRoute extends AbstractBaseRoute {
    setup(controller, secutiry) {
        const { fetchAll, fetchOne, create, update, destroy } = new controller()
        this.server.get("/all", fetchAll)
        this.server.get("/:id", fetchOne)
        this.server.post("/", create)
        this.server.put("/:id", update)
        this.server.delete("/:id", destroy)
    }
}