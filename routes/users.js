const authRouter = require('express').Router();
const { check } = require('express-validator');
const { validatorHandler } = require('../utils/middlewares');
const { createUser, login, renew } = require('../controllers/users');

/*
 ** GET /api/v1/auth/login
 */

authRouter.post(
	'/',
	[
		check('email', 'email is required').isEmail(),
		check('password', 'password is required').isLength({ min: 6 }),
		validatorHandler
	],
	login
);

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

authRouter.post('/renew', renew);

module.exports = authRouter;
