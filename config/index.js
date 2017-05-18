var nconf = require("nconf"),
    path = require("path");
    fs = require("fs");

nconf.argv()
    .env()
    .file(path.join(__dirname, 'config.json'));

module.exports = nconf;
