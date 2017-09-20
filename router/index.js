var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("index");
});

router.get('/login', function(req, res, next) {
    if(req.session.user) {
        res.writeHead(303, {Location: '/'});
        return res.end();
    }

    var next_url = req.query.next ? req.query.next : '/';
    res.end('<html><form method="post" action="/login"><input type="hidden" name="next" value="' + next_url + '"><input type="text" placeholder="username" name="username"><input type="password" placeholder="password" name="password"><button type="submit">Login</button></form>');
});

router.post('/login', function(req, res, next) {
    req.session.user = req.body.username;

    res.writeHead(303, {Location: req.body.next || '/'});
    res.end();
});

router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
        res.writeHead(303, {Location: '/'});
        res.end();
    });
});

router.get('/secret', function(req, res, next) {
    if(req.session.user) {
        res.end('proceed to secret lair, extra data: ' + JSON.stringify(req.session.data));
    } else {
        res.writeHead(403);
        res.end('no');
    }
});

module.exports = router;