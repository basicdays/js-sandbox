BIN=./node_modules/.bin

all: install min test

node_modules:
	npm install

components:
	$(BIN)/component install --dev

install: node_modules components

build: components
	$(BIN)/component build --out ./build/app
	$(BIN)/component build --dev --out ./build/test

min: build
	$(BIN)/uglifyjs build/app/*.js > build/app/build.min.js
#	$(BIN)/cssmin build/app/*.css > build/app/build.min.css
	$(BIN)/uglifyjs build/test/*.js > build/test/build.min.js
	$(BIN)/cssmin build/test/*.css > build/test/build.min.css

test:
	$(BIN)/jshint **/*.js
	$(BIN)/mocha --reporter list

clean:
	rm -fr build components

nuke: clean
	rm -fr node_modules

.PHONY: all install test min clean nuke
