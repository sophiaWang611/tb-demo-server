/**
 * Created by litian on 16/8/2.
 */
'use strict';
var log4js = require('log4js');
var env = process.env.NODE_ENV || 'development';
var path = "logs/";
var type = env === 'production' ? 'dateFile' : 'console';

log4js.configure({
    appenders: [
        {
            type: 'console',
            category: "console"
        },
        {
            type: type,
            filename: path + 'api.log',
            pattern: "-yyyy-MM-dd",
            alwaysIncludePattern: false,
            category: "api"
        },
        {
            type: type,
            filename: path + 'http.log',
            pattern: "-yyyy-MM-dd",
            alwaysIncludePattern: false,
            category: 'http'
        }
    ],
    replaceConsole: true,
    levels:{
        http: 'auto',
        api:'info',
        console: 'all'
    }
});

module.exports = log4js;