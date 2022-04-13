const { watchOptions } = require("nodemon/lib/config/defaults")
const modules = require("../config/src.config.js")
const utils = require(modules.utils)
const helpFile = (require(modules.data)).statics.help.path


/**
 * Returns the help message
 * @returns String 
 */
function help(){
  return utils.readTextFile(helpFile)
}

module.exports = help