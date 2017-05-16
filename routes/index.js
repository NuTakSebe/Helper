var express = require('express');
var router = express.Router();
let url = require("url");

let token;

/* GET home page. */
router.get('/', function(req, res, next) {
    let parsedUrl = url.parse(req.url);
    console.log(parsedUrl.query);
    parsedUrl.query.split('&').forEach(function(item) {
        item = item.split('=');
        if (item[0] === 'token') {
         token = item[1];
        }
    });

    res.render('index', { title: 'Express' });
});

let tokenAdd = "/addItem?token=" + token;
let tokenEdit = "/editItem?token=" + token;

module.exports = router;
