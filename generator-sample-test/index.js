'use strict';
var sample1 = require('./lib/sample1'),
	sample2 = require('./lib/sample2'),
	sample3 = require('./lib/sample3');

function getSelection() {
	process.stdin.once('data', handleSelection);
	process.stdin.resume();
	console.log('run 1-3, or q to quit:');
}

function handleSelection(selection) {
	process.stdin.pause();
	//remove newline
	selection = selection.substring(0, selection.length - 1);
	if (selection === '1') {
		sample1(getSelection);
	} else if (selection === '2') {
		sample2(getSelection);
	} else if (selection === '3') {
		sample3(getSelection);
	} else if (selection === 'q') {
		process.exit(0);
	} else {
		getSelection();
	}
}

process.stdin.setEncoding('utf8');
getSelection();
