export PATH := bin:node_modules/.bin:$(PATH)

build: node_modules lib/templates.js

node_modules: package.json
	@npm install

lib/templates.js:
	@handlebars ./templates -f lib/templates.js

watch:
	template-watch

server:
	@http-server -p 8090

clean:
	@rm -rf lib/templates.js
