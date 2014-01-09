'use strict';

var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 9001);
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.errorHandler());

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
