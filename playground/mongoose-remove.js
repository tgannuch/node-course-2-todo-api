const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

var id = '5a77d6fd4204a23aac7c642d';

// Todo.remove().then((result) => {
// 	console.log(result);
// });

// Todo.findOneAndRemove().then((todo) => {
// 	console.log(result);
// });

Todo.findByIdAndRemove(id).then((todo) => {
	console.log(todo);
});