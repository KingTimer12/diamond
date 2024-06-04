import { start, routes, setupBase } from "diamond"
import BaseController from "./controller/base.js"
import CustomBaseRoute from "./routes/base.js"

setupBase({
    controller() {
        return BaseController
    },
    route() {
        return CustomBaseRoute
    }
})
routes({ managerFile: 'example/routes' })
start({ port: 3030 })