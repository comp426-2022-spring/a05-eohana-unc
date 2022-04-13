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

if (args["debug"]=='true' || args["debug"]){
  // console.log(controllers)
  app.get('/app/log/access', controllers.debugFns.debugAccessLog(db))
  app.get('/app/error', controllers.debugFns.debugError)
}

if (args["log"]!='false'){
  app.use(middleware.logFile(data.logfiles.access.path))
}

app.get('/app', (req, res) => {
  res.statusCode = 200
  res.statusMessage = "OK"
  res.writeHead(res.statusCode, {"Content-Type": "text/plain"})
  res.end(res.statusCode + " " + res.statusMessage)
})

app.get('/app/flip', (req, res) => {
  res.statusCode = 200
  res.statusMessage = "OK"
  // res.writeHead(res.statusCode, {"Content-Type": "application/json"})
  let flip = coin.coinFlip()
  // console.log(flip)
  res.json({"flip": flip})
  res.end()
})

app.get('/app/flips/:number', (req, res) => {
  res.statusCode = 200
  res.statusMessage = "OK"
  // res.writeHead(res.statusCode, {"Content-Type": "application/json"})
  numFlips = parseInt(req.params.number) || 1
  let flips = coin.coinFlips(numFlips)
  // console.log(flip)
  res.json({
    // "aaa":"bbb"
    "raw": flips,
    "summary": coin.countFlips(flips)
})
  res.end()
})

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