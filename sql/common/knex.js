const mysqlConfig = require("../../config").mysqlConfig;

module.exports =  knex = require('knex')({
  client: 'mysql',
  connection: {
    host : mysqlConfig.host,
    user : mysqlConfig.userName,
    password : mysqlConfig.password,
    database : mysqlConfig.dbName,
    charset: "utf8mb4"
  },
  pool: {
    min: 2,
    max: 10
  }
});
