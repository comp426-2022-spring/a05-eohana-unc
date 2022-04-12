// Put your database code here
"use strict";

const modules = require('../config/src.config.js');
const data = require(modules.data);
const utils = require(modules.utils);
const Database = require("better-sqlite3");
const db = new Database(data.db.log.path);

utils.initializeDatabase(db, data.db.log.tables);

module.exports=db;