const { response: res, request: req } = require('express');
const { validationResult } = require('express-validator');
const logger = require('../utils/loggers');

/*
/new
*/
const createUser = (request = req, response = res) => {
	const body = request.body;

	response.status(201).json({ message: 'succeed!', user: body });
};

const login = (request, response = res) => {
	response.status(200).json({ message: 'succeed!' });
};

const renew = (request, response = res) => {
	logger.info('[authRouter], RENEW');

	response.status(200).json({ message: 'renew!' });
};

module.exports = { createUser, login, renew };
