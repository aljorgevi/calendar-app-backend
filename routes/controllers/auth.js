const authRouter = require('express').Router();

/*
 ** GET /api/v1/auth/login
 */

authRouter.get('/', (request, response) => {
	console.log('[authRouter], request received');

	response.status(200).json({ message: 'authRouter!' });
});

module.exports = authRouter;
