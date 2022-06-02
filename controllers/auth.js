const { response: res, request: req } = require('express');
const logger = require('../utils/loggers');

/*
/new
*/
const createUser = (request = req, response = res) => {
	const body = request.body;

	response.status(200).json({ message: 'create!' });
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
