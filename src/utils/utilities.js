// This directory contains general utilities that you can use as helper functions throughout other scripts

/**
 * I don't know if I'll reuse this function yet 
 * 
 * @param {*} string 
 * @returns 
 */
function getpath(string){
  let result = ""
  let index = 0
  for (let i = string.length - 1; i >= 0; i--){
    if (string[i] === "/"){
      index = i;
      break;
    }
  }
  for (let i = 0; i < index; i++){
    result += string[i]
  }
  return result
}

/**
 * Function that takes an object and adds a source path to the each of them
 * 
 * 
 * @param {Object} paths an Object formatted as "name": "path"
 * @param {*} sourcePath a source directory where all the paths are found from the current source
 * 
 * @returns {Object} a new Object containing the updated paths in the same format
 */
function addpath(paths, sourcePath){
  result = {}
  for (let path in paths){
    result[path] = sourcePath + paths[path]
  }
  return result
}

/**
 * Creates retrieves a table from a database given the name
 * @param {Database} db       The Database Object
 * @param {String} tablename  The name of the table
 * @returns The row object of the specified table
 */
function getDatabaseTable(db, tablename){
  return db.prepare(`SELECT 
  name
FROM 
  sqlite_master
WHERE 
  type ='table' AND 
  name = ?;`).get(tablename);
}

/**
 * Sets up a table creation statement
 * @param {Object} tableConfig  Table configuration object with format:
 * {
 *  name: <string>,
 *  columns: {
 *    <columnName>: <string[SQL column type]> 
 *  }
 * }
 * @returns The table creation statement
 */
function setUpTable(tableConfig){
  let statement = `CREATE TABLE ${tableConfig.name} (`
  let count = 0
  for (let col in tableConfig.columns){
    if (count++ > 0){
      statement += ", "
    }
    statement += `${col} ${tableConfig.columns[col]}`
  }
  statement += ");"
  return statement
}

/**
 * Iterate through and add tables to a database
 * @param {Database} db       The Database Object
 * @param {Array[Object]} tables   The configuration object with format:
 *  tables: [
 *    {
 *      name: <string>,
 *      columns: {
 *      <columnName>: <string[SQL column type]> 
 *    }
 *  ]
 * @returns The modified Database Object
 */
function initializeDatabase(db, tables){
  for (let table of tables){
    if (!getDatabaseTable(db, table.name)){
      
      db.exec(setUpTable(table))
    }
  }
  return db
}

const utils = {
  addPath: addpath,
  getPath: getpath,
  getDatabaseTable: getDatabaseTable,
  setUpTable: setUpTable,
  initializeDatabase: initializeDatabase
}

module.exports = utils