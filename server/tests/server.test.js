const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');
const {User} = require('./../models/user.js');
const {todos, populateTodos, usersSeed, populateUsers} = require('./seed/seed.js');

//beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
	it('should create new todo', (done) => {
		var text = 'test todo text';
		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => done(e));
			});
	});

	it('should not create todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((e) => done(e));
			});
	});
});

describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});

	it('should return 404 if todo not valid', (done) => {
		var oid = new ObjectID();
		request(app)
			.get(`/todos/${oid.toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('should return 404 if non-object id', (done) => {
		request(app)
			.get('/todos/123')
			.expect(404)
			.end(done);
	});
});

describe('DELETE /todos/:id', () => {
	it('should remove a todo', (done) => {
		request(app)
			.delete(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});
	it('should return 404 if todo not found', (done) => {
		var oid = new ObjectID();
		request(app)
			.delete(`/todos/${oid.toHexString()}`)
			.expect(404)
			.end(done);
	});
	it('should return 404 if non-object id', (done) => {
		request(app)
			.delete('/todos/123')
			.expect(404)
			.end(done);
	});
})

describe('GET /users/me', () => {
	it('should return user if authenticated', (done) => {
		request(app)
			.get('/users/me')
			.set('x-auth', usersSeed[0].tokens[0].token)
			.expect(200)
			.expect((resp) => {
				expect(resp.body._id).toBe(usersSeed[0]._id.toHexString());
				expect(resp.body.email).toBe(usersSeed[0].email);
			})
			.end(done);
	});

	it('should return 401 if not authenticated', (done) => {
		request(app)
			.get('/users/me')
			.expect(401)
			.expect((resp) => {
				expect(resp.body).toBe({});
			})
			.end(done);
	});
});

describe('POST /users', () => {
	it('should create a user', (done) => {
		var email = 'example@example.com';
		var password = '13mnb!';

		request(app)
			.post('/users')
			.send({email, password})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toExist();
				expect(res.body._id).toExist();
				expect(res.body.email).toBe(email);
			})
			.end((err) => {
				if (err) {
					return done(err);
				}
				User.findOne({email}).then((user) => {
					expect(user).toExist();
					expect(user.password).toNotBe(password);
					done();
				});
			});
	});
	it('should return validation errors if request is invalid', (done) => {
		request(app)
			.post('/users')
			.send({
				email: 'and', password: '123'
			})
			.expect(400)
			.end(done);
	});
	it('should not create user if email in use', (done) => {
		request(app)
			.post('/users')
			.send({
				email: usersSeed[0].email,
				password: usersSeed[0].password
			})
			.expect(400)
			.end(done);
	});
});