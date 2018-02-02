const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', undefined, (error, client) => {
	if (error) {
		return console.log('unable to connect to mongodb server')
	}
	console.log('connected to mongodb server');

	var db = client.db('Todo');
	var collection = db.collection('User', undefined, (error, collection) => {
		if (error) {
			return console.log('error opening collection User');
		}
	});

	// collection.findOneAndUpdate({_id: new ObjectID('5a73dc347d0fcc33b946d1de')}, {
	// 		$set: {
	// 			completed: true
	// 		}
	// 	}, {
	// 		returnOriginal: false
	// 	})
	// 	.then((result) => {
	// 		console.log(result);
	// 	}, (err) => {
	// 		console.log('unable to update todos', err);
	// 	});

	collection.findOneAndUpdate({_id: new ObjectID('5a73d7e598477e376844e6a8')}, {
			$set: {
				name: 'Louise'
			},
			$inc: {
				age: 1
			}
		}, {
			returnOriginal: false
		})
		.then((result) => {
			console.log(result);
		}, (err) => {
			console.log('unable to update todos', err);
		});
	//client.close();
});