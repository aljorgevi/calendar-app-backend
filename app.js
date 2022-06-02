const express = require('express');
const app = express();
const logger = require('./utils/loggers');
const authRouter = require('./routes/auth');

logger.info('connecting to...');

app.use(express.static('public'));

// read & parse the body of the request
app.use(express.json());

app.use('/api/v1/auth', authRouter);

// // TODO: move route to separate file
// TODO: auth, validation, etc. login, etc
//  CRUD: events
// app.get('/', (req, res) => {
// 	console.log('request received');
// 	res.json({
// 		message: 'Hello World!'
// 	});
// });

module.exports = app;
