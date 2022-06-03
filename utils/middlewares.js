const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const logger = require('./loggers');
const { getTokenFrom } = require('./helpers');

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method);
	logger.info('Path:  ', request.path);
	logger.info('Body:  ', request.body);
	logger.info('---');
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
	logger.info('[error] - Method:', request.method);
	logger.info('[error] - Path:  ', request.path);
	logger.info('[error] - Body:  ', request.body);
	if (error.name === 'CastError') {
		logger.info('[error] - CastError: ', error.message);
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		logger.info('[error] - ValidationError: ', error.message);
		return response.status(400).json({ error: error.message });
	} else if (error.name === 'JsonWebTokenError') {
		logger.info('[error] - JsonWebTokenError: ', error.message);
		return response.status(401).json({ error: 'invalid token' });
	} else if (error.name === 'TokenExpiredError') {
		logger.info('[error] - TokenExpiredError: ', error.message);
		return response.status(401).json({
			error: 'token expired'
		});
	}

	logger.error(error.message);

	next(error);
};

// this are validation of the body of the request
const validatorHandler = (request, response, next) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		logger.info('[error] - validatorHandler: ', errors.mapped());
		logger.info('---');
		return response.status(400).json({
			error: errors.mapped()
		});
	}

	next();
};

const validateJWT = (request, response, next) => {
	/* if token want to be passed in the header */
	// 	const token = request.header('x-auth-token');
	const token = getTokenFrom(request);

	if (!token) {
		return response.status(401).json({
			error: 'Access denied. No token provided.'
		});
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET);
		request.username = decoded.username;
		request._userId = decoded.id;
	} catch (error) {
		return response.status(401).json({
			error: 'Invalid token.'
		});
	}

	next();
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	validatorHandler,
	validateJWT
};
