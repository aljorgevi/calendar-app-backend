const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
// const server = require('../index');

const api = supertest(app);

test('Should signup a new user', async () => {
	await api.get('/health').expect('ok');
});

test('should create a user', async () => {
	await api
		.post('/api/v1/users/new-user')
		.send({
			username: 'test1',
			password: 'test21212123',
			email: 'test1@gmail.com'
		})
		.expect(201);
});

afterAll(() => {
	mongoose.connection.close();
});
