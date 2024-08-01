import { AbstractBaseRoute } from "diamond"

export default class CustomBaseRoute extends AbstractBaseRoute {
    setup({ fetchAll, fetchOne, create, update, destroy }, secutiry) {
        const jwt = this.jwt()
        // Qual rota que tiver /alguma_coisa e nela houver também /:id, deverá colocar o /:id acima.
        // Senão, o Fastify entenderá que o /alguma_coisa é um id e não outra rota.
        // Errado:
        // this.server.get("/all", fetchAll)
        // this.server.get("/:id", fetchOne)
        // Certo:
        jwt.get("/:id", fetchOne)
        this.server.get("/all", fetchAll)
        
        jwt.post("/", create)
        jwt.put("/:id", update)
        jwt.delete("/:id", destroy)
    }
}