var http = require('http');
var url = require('url');

var u = url.parse('http://google.com');

var options = {
    agent: false,
    host: u.host,
    keepAlive: false,
    method: u.method,
    path: u.path,
    port: u.port
};

var req = http.request(options, function() {});

req.end();
