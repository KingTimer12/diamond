const { start, routes } = require("../dist/index")
// const index = require("./routes")

routes()
start({ port: 3030 })