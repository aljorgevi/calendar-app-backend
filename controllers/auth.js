const { response: res } = require('express');
const logger = require('../utils/loggers');

const createUser = (request, response = res) => {
	logger.info('[authRouter], CREATE');

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
