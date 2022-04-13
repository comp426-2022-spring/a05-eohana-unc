// The files in this directory contain functions that handle requests coming to different routes

const controllers = {
  coin: require("./coin.js"),
  help: require("./help.js"),
  debugFns: require("./debug.js")
}

module.exports = controllers