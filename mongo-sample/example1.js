'use strict';
var co = require('co'),
	MongoClient = require('mongodb').MongoClient;

co(function *() {
	try {
		var db = yield co.wrap(MongoClient.connect)('mongodb://localhost/snmp');
		var collection = yield co.wrap(db.collection, db)('rawscandata5');
		var query = collection.find();
		var count = yield co.wrap(query.count, query)();
		console.log(count);
		db.close();
	} catch (ex) {
		console.error(ex);
	}
});
