// Place your server entry point code here
const express = require('express')
// const morgan = require("morgan")

// const fs = require("fs")
const args = require("minimist")(process.argv)

const modules = require("./src/config/index.config.js")

const db = require(modules.db)
// const middleware = require(modules.middleware)
// const controllers = require(modules.controllers)
const data = require(modules.data)
const routes = require(modules.routes)

// const app = express()
const port = args["port"] || process.env.port || 5000

routes.app(port, args, {
  db: db, 
  log: data.logfiles.access.path
})
// routes.help(args)

// app.use(middleware.logDB(db))

// // -----------
// if (args["debug"]=='true' || args["debug"]){
//   // console.log(controllers)
//   app.get('/app/log/access', controllers.debugFns.debugAccessLog(db))
//   app.get('/app/error', controllers.debugFns.debugError)
// }
// // --------
// if (args["log"]!='false'){
//   app.use(middleware.logFile(data.logfiles.access.path))
// }
// // ---------

// app.get('/app', controllers.endpoints.base)
// app.get('/app/flip', controllers.endpoints.flip)

// app.get('/app/flips/:number', controllers.endpoints.flips)

// app.get('/app/flip/call/:call(heads|tails)',controllers.endpoints.flipCall)

// app.use(controllers.endpoints.notFound)

// app.listen(port, () => {
//   console.log('App listening on port %PORT%'.replace('%PORT%',port))
// })