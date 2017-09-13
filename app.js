var express = require('express'),
    OAuth2Provider = require('oauth2-provider').OAuth2Provider,
    session = require('express-session'),
    MemoryStore = require('express-session').MemoryStore,
    bodyParser = require('body-parser'),
    path = require('path'),
    _ = require('underscore'),
    cookieParser = require('cookie-parser'),
    uuid = require('node-uuid'),
    log4js = require("./util").log4js,
    logger = log4js.getLogger("http");

var app = express();
app.use(log4js.connectLogger(logger, {
    level: 'auto',
    format: ':req[x-request-id]^#:method^#:url^#HTTP/:http-version^#:remote-addr^#:status^#:response-time^#:req[cookie]'
}));

var myClients = {
    '1': '1secret'
};
var myGrants = {};
var myOAP = new OAuth2Provider({crypt_key: 'encryption secret', sign_key: 'signing secret'});
myOAP.on('enforce_login', function(req, res, authorize_url, next) {
    if(req.session.user) {
        next(req.session.user);
    } else {
        res.writeHead(303, {Location: '/login?next=' + encodeURIComponent(authorize_url)});
        res.end();
    }
});
myOAP.on('authorize_form', function(req, res, client_id, authorize_url) {
    res.end('<html>this app wants to access your account... <form method="post" action="' + authorize_url + '"><button name="allow">Allow</button><button name="deny">Deny</button></form>');
});
myOAP.on('save_grant', function(req, client_id, code, next) {
    if(!(req.session.user in myGrants))
        myGrants[req.session.user] = {};

    myGrants[req.session.user][client_id] = code;
    next();
});
myOAP.on('remove_grant', function(user_id, client_id, code) {
    if(myGrants[user_id] && myGrants[user_id][client_id])
        delete myGrants[user_id][client_id];
});
myOAP.on('lookup_grant', function(client_id, client_secret, code, next) {
    if(client_id in myClients && myClients[client_id] == client_secret) {
        for(var user in myGrants) {
            var clients = myGrants[user];

            if(clients[client_id] && clients[client_id] == code)
                return next(null, user);
        }
    }

    next(new Error('no such grant found'));
});

myOAP.on('create_access_token', function(user_id, client_id, next) {
    var extra_data = 'blah'; // can be any data type or null
    //var oauth_params = {token_type: 'bearer'};

    next(extra_data/*, oauth_params*/);
});

myOAP.on('save_access_token', function(user_id, client_id, access_token) {
    console.log('saving access token %s for user_id=%s client_id=%s', JSON.stringify(access_token), user_id, client_id);
});

myOAP.on('access_token', function(req, token, next) {
    var TOKEN_TTL = 10 * 60 * 1000; // 10 minutes

    if(token.grant_date.getTime() + TOKEN_TTL > Date.now()) {
        req.session.user = token.user_id;
        req.session.data = token.extra_data;
    } else {
        console.warn('access token for user %s has expired', token.user_id);
    }

    next();
});

myOAP.on('client_auth', function(client_id, client_secret, username, password, next) {
    if(client_id in myClients && myClients[client_id] == client_secret) {
        var user_id = '1337';

        return next(null, user_id);
    }

    return next(new Error('client authentication denied'));
});

app.use(function (req, res, next) {
    req.headers['x-request-id'] = uuid.v4();
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.query());
app.use(cookieParser());
app.use(session({store: new MemoryStore({reapInterval: 5 * 60 * 1000}), secret: 'abracadabra', resave: true, saveUninitialized: true}));
app.use(myOAP.oauth());
app.use(myOAP.login());

app.use(function(req, res, next) {
    if(!req.session.user && !_isInExceptList(req.url, LOGIN_EXCEPT_URL)) {
        return res.redirect("/login");
    }
    next();
});

app.use('/', require('./router/index'));

var LOGIN_EXCEPT_URL = ['^/login', '^/logout'];
function _isInExceptList(url, excepts) {
    for(var i = 0; i < excepts.length; i++) {
        if (new RegExp(excepts[i]).test(url)) return true;
    }
    return false;
}

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
