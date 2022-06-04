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
		check('email', 'email not valid').isEmail(),
		check('password', 'password at least 6 length').isLength({ min: 6 }),
		validatorHandler
	],
	login
);

module.exports = loginRouter;
