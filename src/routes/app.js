const modules = require("../config/src.config.js")
const middleware = require(modules.middleware)
const controllers = require(modules.controllers)
const express = require('express')
const app = express()


function server(port, args, data){
  routes.help(args)

  app.use(middleware.logDB(data.db))

  // -----------
  if (args["debug"]=='true' || args["debug"]){
    // console.log(controllers)
    app.get('/app/log/access', controllers.debugFns.debugAccessLog(data.db))
    app.get('/app/error', controllers.debugFns.debugError)
  }
  // --------
  if (args["log"]!='false'){
    app.use(middleware.logFile(data.log))
  }
  // ---------

  app.get('/app', controllers.endpoints.base)
  app.get('/app/flip', controllers.endpoints.flip)

  app.get('/app/flips/:number', controllers.endpoints.flips)

  app.get('/app/flip/call/:call(heads|tails)',controllers.endpoints.flipCall)

  app.use(controllers.endpoints.notFound)

  app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
  })
}

module.exports = server