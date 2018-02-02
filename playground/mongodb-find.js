const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017', undefined, (error, client) => {
	if (error) {
		return console.log('unable to connect to mongodb server')
	}
	console.log('connected to mongodb server');

	var db = client.db('Todo');
	var collection = db.collection('Todos', undefined, (error, collection) => {
		if (error) {
			return console.log('error opening collection Todos');
		}
	});
	// collection.find({_id: new ObjectID('5a73dc347d0fcc33b946d1de')})
	// 	.toArray()
	// 	.then((docs) => {
	// 		console.log('Todos');
	// 		console.log(JSON.stringify(docs, undefined, 2));
	// 	}, (err) => {
	// 		console.log('unable to fetch todos', err);
	// 	});

	collection.find({text: 'test'})
		.toArray()
		.then((docs) => {
			console.log('Todos');
			console.log(JSON.stringify(docs, undefined, 2));


		}, (err) => {
			console.log('unable to fetch todos', err);
		});

	//client.close();
});