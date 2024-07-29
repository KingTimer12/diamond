import { AbstractBaseRoute } from "diamond"

export default class CustomBaseRoute extends AbstractBaseRoute {
    setup({ fetchAll, fetchOne, create, update, destroy }, secutiry) {
        // Qual rota que tiver /alguma_coisa e nela houver também /:id, deverá colocar o /:id acima.
        // Senão, o Fastify entenderá que o /alguma_coisa é um id e não outra rota.
        // Errado:
        // this.server.get("/all", fetchAll)
        // this.server.get("/:id", fetchOne)
        // Certo:
        this.server.get("/:id", fetchOne)
        this.server.get("/all", fetchAll)

        this.server.post("/", create)
        this.server.put("/:id", update)
        this.server.delete("/:id", destroy)
    }
}