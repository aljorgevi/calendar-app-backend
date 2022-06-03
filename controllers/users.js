const bcrypt = require('bcrypt');
const { response: res, request: req } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const logger = require('../utils/loggers');

/*
/new-user
*/
const createUser = async (request, response) => {
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

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const user = new User({
		username: body.username,
		email: body.email,
		password: passwordHash
	});

	const savedUser = await user.save();

	response.status(201).json({ id: savedUser._id });
};

/*
/login
*/
const login = async (request, response) => {
	const body = request.body;

	// TODO: see what happends with wrong email or username

	const user = await User.findOne({ email: body.email });

	const passwordCorrect =
		user === null ? false : await bcrypt.compare(body.password, user.password);

	if (!(user && passwordCorrect)) {
		return response.status(401).json({ error: 'invalid email or password' });
	}

	// TODO: add token to the response
	// const userForToken = {
	// 	username: user.username,
	// 	id: user._id
	// };

	// const token = jwt.sign(userForToken, process.env.SECRET, {
	// 	expiresIn: 60 * 60 * 24 * 7 * 4
	// });
	const token = new Date().getTime();

	response
		.status(200)
		.send({ token, username: user.username, name: user.name });
};

const renew = (request, response = res) => {
	logger.info('[authRouter], RENEW');

	response.status(200).json({ message: 'renew!' });
};

module.exports = { createUser, login, renew };
