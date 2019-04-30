const knex = require("knex");
// importing knexfile instead of hard-coding
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);


module.exports = db;