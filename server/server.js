var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, resp) => {
	var todo = new Todo({
		text: req.body.text
	});
	todo.save().then((doc) => {
		resp.send(doc);
	}, (e) => {
		resp.status(400).send(e);
	});
});

app.listen(3000, () => {
	console.log('server started on port 3000');
});

app.get('/todos', (req, resp) => {
	Todo.find().then(todos => {
		resp.send({todos});
	}, (err) => {
		if (err) {
			resp.status(400).send(err);
		}
	});
});


module.exports = {
	app
};