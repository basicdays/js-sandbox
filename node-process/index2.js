var exec = require('child_process').exec;
var path = require('path');
var clone = require('clone-component');

var env = clone(process.env);
env.PATH = path.resolve('node_modules/.bin') + path.delimiter + env.PATH;

var options = {
	env: env,
	customFds: [0,1,2]
}

var child = exec(
	'jshint *.js **/*.js',
	options,
	function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		if (err) {
			console.log(err);
		}
	}
);
