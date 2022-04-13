const modules = require("../config/src.config.js")
const help = (require(modules.controllers)).help

function runHelp(args){
  if (args["help"] || args["h"]){
    console.log(help())
    process.exit(0)
  }
}

module.exports = runHelp