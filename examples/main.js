const { start, routes } = require("../dist/index")
const index = require("./routes")

routes({ index })
start({ port: 3030 })