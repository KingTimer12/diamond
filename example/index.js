import { start, routes } from "diamond"

// console.log(start)

routes({ managerFile: 'example/routes' })
start({ port: 3030 })