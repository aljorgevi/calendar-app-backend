const authRouter = require('express').Router();
const { check } = require('express-validator');
const { createUser, login, renew } = require('../controllers/auth');

/*
 ** GET /api/v1/auth/login
 */

authRouter.post(
	'/',
	[
		check('email', 'email is required').isEmail(),
		check('password', 'password is required').isLength({ min: 6 })
	],
	login
);

authRouter.post(
	'/new',
	[
		check('name', 'name is required').not().isEmpty(),
		check('email', 'email is required').isEmail(),
		check('password', 'password is required').isLength({ min: 6 })
	],
	createUser
);

authRouter.post('/renew', renew);

module.exports = authRouter;
