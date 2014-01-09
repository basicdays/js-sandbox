'use strict';

module.exports = function(grunt) {
	var shellOptions = {stdout: true, stderr: true};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		shell: {
			npmInstall: {command: 'npm install', options: shellOptions},
			componentInstall: {command: './node_modules/.bin/component install --dev', options: shellOptions},
			componentBuild: {command: './node_modules/.bin/component build --out ./build/app', options: shellOptions},
			componentBuildDev: {command: './node_modules/.bin/component build --dev --out ./build/test', options: shellOptions},
			mocha: {command: './node_modules/.bin/mocha --reporter list', options: shellOptions}
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
					'unused': true,
					'strict': true,
					'trailing': true,

					'debug': true,
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
		},

		uglify: {
			options: {
				report: 'min'
			},
			release: {
				files: {'build/app/index.min.js': ['build/app/index.js']}
			},
			releaseTest: {
				files: {'build/test/index.min.js': ['build/test/index.js']}
			}
		},

		cssmin: {
			options: {
				report: 'min'
			},
			release: {

			},
			releaseTest: {
				files: {'build/test/index.min.css': ['build/test/index.css']}
			}
		},

		clean: ['build']
	});

	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['install', 'min', 'test']);
	grunt.registerTask('install', ['shell:npmInstall', 'shell:componentInstall']);
	grunt.registerTask('build', ['shell:componentBuild', 'shell:componentBuildDev']);
	grunt.registerTask('test', ['jshint', 'shell:mocha']);
	grunt.registerTask('min', ['build', 'uglify', 'cssmin']);
};
