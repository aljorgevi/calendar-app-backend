const authRouter = require('express').Router();
const { check } = require('express-validator');
const { validatorHandler, validateJWT } = require('../utils/middlewares');
const { createUser, renewToken } = require('../controllers/users');

// TODO:  CREATE A PATH TO FIND USER BY ID

/*
 ** GET /api/v1/users/new-user
 */
authRouter.post(
	'/new-user',
	[
		check('username', 'username is required').not().isEmpty(),
		check('email', 'email is required').isEmail(),
		check('password', 'password is required').isLength({ min: 6 }),
		validatorHandler
	],
	createUser
);

authRouter.post('/renew-token', validateJWT, renewToken);

module.exports = authRouter;
