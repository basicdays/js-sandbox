'use strict';
var co = require('co'),
	should = require('chai').should();

function sleep(ms) {
	return function(done){
		setTimeout(done, ms);
	}
}

function *secondLevel() {
	return yield sleep(50);
}

function *firstLevel() {
	yield sleep(50);
	yield secondLevel();
	return 6;
}

describe('work', function() {
	it('should work', function(done) {
		co(function *(){
			var stuff = yield firstLevel();
			stuff.should.equal(6);
			done();
		});
	});
});
