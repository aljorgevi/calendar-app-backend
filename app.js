const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const eventsRouter = require('./routes/events');
const middleware = require('./utils/middlewares');
const logger = require('./utils/loggers');
const mongoose = require('mongoose');
const { version } = require('./package.json');

logger.info('connecting to', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		logger.info('connected to MongoDB');
		logger.info('your current env is: ', process.env.NODE_ENV);
	})
	.catch(error => {
		logger.error('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.static('public'));
// read & parse the body of the request
app.use(express.json());
app.use(middleware.requestLogger);

app.get('/health', (req, res) => {
	res.send('ok');
});

app.get('/version', (req, res) => {
	res.send(version);
});

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/events', eventsRouter);

// last two middlewares are for error handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
