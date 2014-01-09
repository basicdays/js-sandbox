'use strict';
var fs = require('fs'),
	path = require('path');

function* files(next, list) {
	var results = [];
	for (var k = 0; k < list.length; k++) {
		var fileContents = yield list[k];
		results.push(fileContents);
	}
	console.log(results);
	return next;
}

function process(fileIterator, fileResponse) {
	var curFileIteration = fileIterator.next(fileResponse);
	if (curFileIteration.done) {
		curFileIteration.value();
		return;
	}
	var file = path.resolve(__dirname, curFileIteration.value);
	fs.readFile(file, 'utf8', function(err, res) {
		if (err) {fileIterator.throw(err);}
		else {process(fileIterator, res);}
	});
}

module.exports = function(next) {
	var filesToProcess = ['file1.txt', 'file2.txt', 'file3.txt'];
	var iterator = files(next, filesToProcess);
	process(iterator);
};
