import { start, routes, setupBase } from "diamond"
import { BaseController } from "./controller/index.js"
import CustomBaseRoute from "./routes/base.js"

import './middleware/index.js'

setupBase({
    controller() {
        return BaseController
    },
    route() {
        return CustomBaseRoute
    }
})

routes({ managerFile: 'example/routes' })

start({
    port: 3030,
    // debug: { routes: true },
    auth: { algorithm: "HS256", key: "secret" },
    cors: { origin: "*" },
    notFound: "Rota não encontrada, verifique se não errou nada na URL."
})