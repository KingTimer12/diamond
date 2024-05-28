const { start, routes } = require("../dist/index")
const index = require("./routes")

start({ port: 3333 })

routes({ index  })