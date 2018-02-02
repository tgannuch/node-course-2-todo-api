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

	// findOneAndDelete
	// deleteOne
	// deleteMany

	collection.deleteMany({text: 'Jen'})
		.then((result) => {
			console.log(result);
		}, (err) => {
			console.log('unable to fetch todos', err);
		});

	//client.close();
});