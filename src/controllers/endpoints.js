const coin = require("./coin.js")

function base(req, res){
  res.statusCode = 200
  res.statusMessage = "OK"
  res.writeHead(res.statusCode, {"Content-Type": "text/plain"})
  res.end(res.statusCode + " " + res.statusMessage)
}

function flip(req, res) {
  res.statusCode = 200
  res.statusMessage = "OK"
  let flip = coin.coinFlip()
  res.json({"flip": flip})
  res.end()
}

function flips(req, res) {
  res.statusCode = 200
  res.statusMessage = "OK"
  numFlips = parseInt(req.params.number) || 1
  let flips = coin.coinFlips(numFlips)
  res.json({
    "raw": flips,
    "summary": coin.countFlips(flips)
  })
  res.end()
}

function flipCall(req, res){
  res.statusCode = 200
  res.statusMessage = "OK"
  res.json(coin.flipACoin(req.params.call)).end()
}

function notFound(req, res){
  res.status(404).send('404 NOT FOUND')
}

const functions = {
  base: base,
  flip: flip,
  flips: flips,
  flipCall: flipCall,
  notFound: notFound
}

module.exports = functions