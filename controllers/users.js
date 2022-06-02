const { response: res, request: req } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const logger = require('../utils/loggers');

/*
/new
*/
const createUser = async (request = req, response = res) => {
	const body = request.body;

	const user = new User({
		username: body.username,
		email: body.email,
		password: body.password
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
};

const login = (request, response = res) => {
	response.status(200).json({ message: 'succeed!' });
};

const renew = (request, response = res) => {
	logger.info('[authRouter], RENEW');

	response.status(200).json({ message: 'renew!' });
};

module.exports = { createUser, login, renew };
