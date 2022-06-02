const { response: res, request: req } = require('express');
const { validationResult } = require('express-validator');
const logger = require('../utils/loggers');

/*
/new
*/
const createUser = (request = req, response = res) => {
	const body = request.body;

	// error handling
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.status(400).json({
			error: errors.mapped()
		});
	}

	response.status(201).json({ message: 'success!', user: body });
};

const login = (request, response = res) => {
	logger.info('[authRouter], LOGIN');
	response.status(200).json({ message: 'login!' });
};

const renew = (request, response = res) => {
	logger.info('[authRouter], RENEW');

	response.status(200).json({ message: 'renew!' });
};

module.exports = { createUser, login, renew };
