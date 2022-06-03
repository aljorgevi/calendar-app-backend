const usersRouter = require('express').Router();
const { check } = require('express-validator');
const { validatorHandler, validateJWT } = require('../utils/middlewares');
const { createUser, renewToken } = require('../controllers/users');

// TODO:  CREATE A PATH TO FIND USER BY ID

/*
 ** GET /api/v1/users/new-user
 */
usersRouter.post(
	'/new-user',
	[
		check('username', 'username is required').not().isEmpty(),
		check('email', 'email is required').isEmail(),
		check('password', 'password is required').isLength({ min: 6 }),
		validatorHandler
	],
	createUser
);

usersRouter.post('/renew-token', validateJWT, renewToken);

usersRouter.post('/test-validation', (request, response) => {
	// check for bearer token in authorization
	const { authorization } = request.headers;
	console.log({ authorization });

	response.status(200).json({
		message: 'test validation'
	});
});

module.exports = usersRouter;
