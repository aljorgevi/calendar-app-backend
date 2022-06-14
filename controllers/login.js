const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/helpers');

/*
/login
*/
const login = async (request, response) => {
	const body = request.body;

	const user = await User.findOne({ email: body.email });

	const passwordCorrect =
		user === null ? false : await bcrypt.compare(body.password, user.passwordHash);

	if (!user || !passwordCorrect) {
		return response.status(401).json({ error: 'invalid email or password' });
	}

	const userForToken = {
		username: user.username,
		id: user._id
	};

	const { token, expiresIn } = generateToken(userForToken);

	response.status(200).send({
		id: user._id.toString(),
		token,
		expiresIn,
		username: user.username
	});
};

module.exports = { login };
