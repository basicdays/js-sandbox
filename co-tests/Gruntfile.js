'use strict';

module.exports = function(grunt) {
	var shellOptions = {stdout: true, stderr: true};

	grunt.initConfig({
		shell: {
			mocha: {command: './node_modules/.bin/mocha --harmony-generators --reporter spec', options: shellOptions}
		},

		jshint: {
			all: {
				src: ['**/*.js'],
				options: {
					ignores: ['.idea/**', 'build/**', 'components/**', 'node_modules/**'],

					'camelcase': true,
					'curly': true,
					'immed': true,
					'latedef': 'nofunc',
					'newcap': true,
					'noarg': true,
					'undef': true,
					'unused': false,
					'strict': true,
					'trailing': true,

					'debug': true,
					'esnext': true,
					'expr': true,
					'globalstrict': true,
					'multistr': true,
					'smarttabs': true,

					'node': true,
					'globals': {
						'describe': true,
						'it': true
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['test']);
	grunt.registerTask('test', ['jshint', 'shell:mocha']);
};
