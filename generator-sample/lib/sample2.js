'use strict';
var fs = require('fs'),
	path = require('path');

function* numbers() {
	var stuffIGot = [];
	for (var k = 0; k < 2; ++k) {
		var itemReceived = yield k;
		stuffIGot.push(itemReceived);
	}
	console.log(stuffIGot);
}

module.exports = function(next) {
	var iterator = numbers();
	console.log(iterator.next());
	console.log(iterator.next('present'));
	fs.readFile(path.resolve(__dirname, 'file.txt'), 'utf8', function(err, data) {
		if (err) {throw err;}
		console.log(iterator.next(data));
		next();
	});
};
