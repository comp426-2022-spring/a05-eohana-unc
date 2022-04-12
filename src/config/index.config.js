const config = require("./general.config.js")
const utils = require("../utils/utilities.js")

config.modules = utils.addPath(config.modules, "./src/")
// console.log(config)

module.exports = config