/**
 * Set up the function for debug access log
 * @param {Database} db     A database Object to view
 * @returns A (req, res) function for passing into express
 */
function debugAccessLog (db) {
  return (req, res) => {
  const stmt = db.prepare("SELECT * FROM log").all()
  res.status(200).json(stmt)
  }
}

/**
 * Sets up error log function
 * @param {Object} req 
 * @param {Object} res 
 */

function debugError(req, res) {
  res.status(500).end("Error test successful.")
}

functions = {
  debugAccessLog: debugAccessLog,
  debugError: debugError
}

module.exports = functions