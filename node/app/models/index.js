const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//const db = {};
dbConfig.mongoose = mongoose;
dbConfig.url = dbConfig.url;
dbConfig.user = require("./user.model.js");

module.exports = dbConfig;