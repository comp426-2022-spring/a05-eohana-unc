// Middleware function definitions go here
const middleware = {
  logDB: require("./accessDB.js"),
  logFile: require("./accessLog.js")
}

module.exports = middleware