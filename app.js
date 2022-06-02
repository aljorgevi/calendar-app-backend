const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/auth');
const middleware = require('./utils/middleware');
const logger = require('./utils/loggers');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch(error => {
		logger.error('error connecting to MongoDB:', error.message);
	});

app.use(express.static('public'));
app.use(cors());
// read & parse the body of the request
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/v1/auth', authRouter);

// last two middlewares are for error handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
