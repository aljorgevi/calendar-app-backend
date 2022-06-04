const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/helpers');

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
		passwordHash
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
};

/*
/renew-token
*/
const renewToken = (request, response) => {
	const userForToken = {
		username: request.username,
		id: request.id
	};

	const { token, expiresIn } = generateToken(userForToken);

	response.status(200).json({ token, expiresIn });
};

module.exports = { createUser, renewToken };
