import { start, routes } from "diamond"

routes({ managerFile: 'example/routes' })
start({ port: 3030 })