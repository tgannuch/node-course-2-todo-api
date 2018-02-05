require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT;

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

app.get('/todos', (req, resp) => {
	Todo.find().then(todos => {
		resp.send({todos});
	}, (err) => {
		if (err) {
			resp.status(400).send(err);
		}
	});
});

app.get('/todos/:id', (req, resp) => {
	var id = req.params.id;
	if (ObjectID.isValid(id)) {
		Todo.findById(id).then(todo => {
			if (!todo) {
				return resp.status(404).send();
			}
			resp.send({todo});
		}, (err) => {
			if (err) {
				resp.status(400).send(err);
			}
		});
	} else {
		return resp.status(404).send();
	}
});

app.delete('/todos/:id', (req, resp) => {
	var id = req.params.id;
	if (ObjectID.isValid(id)) {
		Todo.findByIdAndRemove(id).then(todo =>  {
			if (!todo) {
				return resp.status(404).send();
			}
			resp.send({
				todo,
				count: 1
			});
		}, (err) => {
			if (err) {
				resp.status(400).send(err);
			}
		});
	} else {
		return resp.status(404).send();
	}

});

app.patch('/todos/:id', (req, resp) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);
	if (ObjectID.isValid(id)) {
		if (_.isBoolean(body.completed) && body.completed) {
			body.completedAt = new Date().getTime();
		} else {
			body.completed = false;
			body.completedAt = null;
		}

		Todo.findByIdAndUpdate(id, {
			$set: body
		}, {
			new: true
		}).then((todo) => {
			if (!todo) {
				return resp.status(404).send();
			}
			resp.send({todo});
		}).catch((e) => {
			resp.status(400).send();
		});
	} else {
		return resp.status(404).send();
	}
});

app.post('/users', (req, resp) => {
	var user = new User(_.pick(req.body, ['email', 'password']));
	user.save().then((user) => {
		return user.generateAuthToken();
	}).then((token) => {
		resp.header('x-auth', token).send(user);
	}).catch((e) => {
		resp.status(400).send(e);
	});
});

app.listen(port, () => {
	console.log(`server started on port ${port}`);
});

module.exports = {
	app
};