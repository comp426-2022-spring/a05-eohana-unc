const fs = require("fs")
const morgan = require("morgan")

/**
 * Returns a morgan
 * 
 * @param {String} filename 
 * @returns 
 */
function logFile (filename) {
  const writeStream = fs.createWriteStream(filename, {flags: 'a'})
  return morgan("combined", {stream: writeStream})
}

module.exports = logFile