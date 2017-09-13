const config = require("../config/index").config;
const cfg = config.mysqlConfig;
const knex = require('knex');

module.exports =  knex({
    client: 'mysql',
    connection: {
        host     : cfg.host,
        user     : cfg.user,
        password : cfg.password,
        database : cfg.database,
        charset: "utf8mb4"
    },
    pool: {
        min: 2,
        max: 10
    }
});