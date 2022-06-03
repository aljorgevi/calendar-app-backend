const loginRouter = require('express').Router();
const { check } = require('express-validator');
const { validatorHandler } = require('../utils/middlewares');
const { login } = require('../controllers/login');

/*
 ** GET /api/v1/login
 */

loginRouter.post(
	'/',
	[
		check('email', 'email is required').isEmail(),
		check('password', 'password is required').isLength({ min: 6 }),
		validatorHandler
	],
	login
);

module.exports = loginRouter;
