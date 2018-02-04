const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

var id = '5a7483a3021a77379c0538ca';


// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });


// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todos', todo);
// });

// Todo.findById(id
// 	).then((todo) => {
// 	if (!todo) {
// 		return console.log('id not found');
// 	}
// 	console.log('Todos by Id', todo);
// }).catch ((e) => {
// 	console.log(e);
// });


if (!ObjectID.isValid(id)) {
	console.log('ID not valid');
} else {
	User.findById(id).then(user => {
		if (!user) {
			return console.log('user not found');
		}
		console.log(user);
	}).catch((e) => {
	 	console.log(e);
	});
}

