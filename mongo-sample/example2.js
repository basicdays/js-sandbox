'use strict';
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/snmp', function(err, db) {
	if (err) {error(err);}
	db.collection('rawscandata6', function(err, collection) {
		if (err) {error(err);}
		collection.find().count(function(err, result) {
			if (err) {error(err);}
			console.log(result);
			db.close(function(err) {
				if (err) {error(err);}
			})
		});
	})
});

function error(err) {
	console.error(err);
	process.exit();
}
