'use strict';
var co = require('co'),
	MongoClient = require('mongodb').MongoClient,
	should = require('chai').should();

function getClient() {
	return function(done) {
		MongoClient.connect('mongodb://localhost/snmp', done);
	};
}

function getCollection(client) {
	return function(done) {
		client.collection('rawscandata5', done);
	}
}

function getCount(query) {
	return function(done) {
		query.count(done);
	}
}

function *rawScanData() {
	var client = yield getClient();
	return yield getCollection(client);
}

function *rawScanDataCount() {
	var collection = yield rawScanData();
	var query = collection.find();
	return yield getCount(query);
}

describe.skip('getting a db', function() {
	it('should work without a chain', function(done) {
		co(function *() {
			var client = yield getClient();
			should.exist(client);
			done();
		});
	});

	it('should exist one nested', function(done) {
		co(function *() {
			var client = yield getClient();
			var collection = yield getCollection(client);
			should.exist(collection);
			done();
		});
	});

	it('should exist two nested', function(done) {
		co(function *() {
			var collection = yield rawScanData();
			should.exist(collection);
			done();
		});
	});

	it('should count flat', function(done) {
		co(function *() {
			var client = yield getClient();
			var collection = yield getCollection(client);
			var query = collection.find();
			var count = yield getCount(query);

			should.exist(count);
			count.should.be.above(0);
			done();
		});
	});

	it('should count abstracted', function(done) {
		co(function *() {
			var collection = yield rawScanData();
			var query = collection.find();
			var count = yield getCount(query);

			should.exist(count);
			count.should.be.above(0);
			done();
		});
	});

	it('should count super abstracted', function(done) {
		co(function *() {
			var count = yield rawScanDataCount();

			should.exist(count);
			count.should.be.above(0);
			done();
		});
	})
});