import { start, routes, setupBase } from "diamond"
import { BaseController } from "./controller/index.js"
// import CustomBaseRoute from "./routes/base.js"

setupBase({
    controller() {
        return BaseController
    },
})
routes({ managerFile: 'example/routes' })
start({ port: 3030 })