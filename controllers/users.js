const { response: res, request: req } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const logger = require('../utils/loggers');

/*
/new
*/
const createUser = async (request = req, response = res) => {
	const body = request.body;

	// we add email and username validation to send a meaningful error message, rather that the default sent by express-validator or mongoDB
	const emailExist = await User.findOne({ email: body.email });
	if (emailExist) {
		return response.status(400).json({
			error: 'email already exist'
		});
	}

	const usernameExist = await User.findOne({ username: body.username });
	if (usernameExist) {
		return response.status(400).json({
			error: 'username already exist'
		});
	}

	const user = new User({
		username: body.username,
		email: body.email,
		password: body.password
	});

	const savedUser = await user.save();

	response.status(201).json({ id: savedUser._id });
};

const login = (request, response = res) => {
	response.status(200).json({ message: 'succeed!' });
};

const renew = (request, response = res) => {
	logger.info('[authRouter], RENEW');

	response.status(200).json({ message: 'renew!' });
};

module.exports = { createUser, login, renew };
