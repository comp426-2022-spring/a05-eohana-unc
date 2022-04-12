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

const utils = {
  addPath: addpath,
  getPath: getpath
}

module.exports = utils