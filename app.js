var express = require('express'),
    session = require('express-session'),
    MemoryStore = require('express-session').MemoryStore,
    bodyParser = require('body-parser'),
    path = require('path'),
    _ = require('underscore'),
    cookieParser = require('cookie-parser'),
    uuid = require('node-uuid'),
    log4js = require("./util").log4js,
    config = require("./config"),
    cons = require('consolidate'),
    oauthConfig = require("./oauthConfig"),
    logger = log4js.getLogger("http");

var app = express();
app.use("/static", express.static("./dist/static"));
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', "./dist");

app.use(log4js.connectLogger(logger, {
    level: 'auto',
    format: ':req[x-request-id]^#:method^#:url^#HTTP/:http-version^#:remote-addr^#:status^#:response-time^#:req[cookie]'
}));
app.use(function (req, res, next) {
    req.headers['x-request-id'] = uuid.v4();
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.query());
app.use(cookieParser());
app.use(session({store: new MemoryStore({reapInterval: 5 * 60 * 1000}), secret: 'abracadabra', resave: true, saveUninitialized: true}));
app.use(oauthConfig.oauth());
app.use(oauthConfig.login());

app.use(function(req, res, next) {
    if(!req.session.user && !_isInExceptList(req.url, LOGIN_EXCEPT_URL)) {
        return res.redirect("/login");
    }
    next();
});

var LOGIN_EXCEPT_URL = ['^/login', '^/logout'];
function _isInExceptList(url, excepts) {
    for(var i = 0; i < excepts.length; i++) {
        if (new RegExp(excepts[i]).test(url)) return true;
    }
    return false;
}

app.use('/', require('./router/index'));
app.use('/task', require('./router/task'));

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
