// Place your server entry point code here
const express = require('express')
// const morgan = require("morgan")

// const fs = require("fs")
const args = require("minimist")(process.argv)

const modules = require("./src/config/index.config.js")

const db = require(modules.db)
const middleware = require(modules.middleware)
const controllers = require(modules.controllers)
const coin = controllers.coin
const data = require(modules.data)
const routes = require(modules.routes)

const app = express()
const port = args["port"] || process.env.port || 5000

routes.help(args)

app.use(middleware.logDB(db))

// -----------
if (args["debug"]=='true' || args["debug"]){
  // console.log(controllers)
  app.get('/app/log/access', controllers.debugFns.debugAccessLog(db))
  app.get('/app/error', controllers.debugFns.debugError)
}
// --------
if (args["log"]!='false'){
  app.use(middleware.logFile(data.logfiles.access.path))
}
// ---------

app.get('/app', controllers.endpoints.base)
app.get('/app/flip', controllers.endpoints.flip)

app.get('/app/flips/:number', controllers.endpoints.flips)

app.get('/app/flip/call/:call(heads|tails)', (req, res) => {
  res.statusCode = 200
  res.statusMessage = "OK"
  res.json(coin.flipACoin(req.params.call)).end()
})

app.use((req, res) => {
  res.status(404).send('404 NOT FOUND')
})

app.listen(port, () => {
  console.log('App listening on port %PORT%'.replace('%PORT%',port))
})