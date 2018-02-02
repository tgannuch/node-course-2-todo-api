//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);



MongoClient.connect('mongodb://localhost:27017', undefined, (error, client) => {
	if (error) {
		return console.log('unable to connect to mongodb server')
	}
	console.log('connected to mongodb server');

	// var db = client.db('Todo');
	// var collection = db.collection('Todos', undefined, (error, collection) => {
	// 	if (error) {
	// 		return console.log('error opening collection Todos');
	// 	}
	// });
	// console.log(collection.insertOne({
	// 		text:'test',
	// 		completed: false
	// 	}, 
	// 	undefined,
	// 	(error, result) => {
	// 	 	if (error) {
	// 			return console.log('error inserting');
	// 	 	}
	// 	 	console.log(JSON.stringify(result.ops));
	// 	}
	// ));
	
	// var db = client.db('Todo');
	// var collection = db.collection('User', undefined, (error, collection) => {
	// 	if (error) {
	// 		return console.log('error opening collection User');
	// 	}
	// });
	// collection.insertOne({
	// 		name: 'Tony',
	// 		age: 44,
	// 		location: 'Baton Rouge, LA'
	// 	}, 
	// 	undefined,
	// 	(error, result) => {
	// 	 	if (error) {
	// 			return console.log('error inserting into User');
	// 	 	}
	// 	 	console.log(JSON.stringify(result.ops));
	// 	 	console.log(result.ops[0]._id.getTimestamp());
	// 	}
	// );

	client.close();
});