const { createUser, login, renew } = require('../controllers/auth');

const authRouter = require('express').Router();

/*
 ** GET /api/v1/auth/login
 */

authRouter.post('/', login);

authRouter.post('/new', createUser);

authRouter.post('/renew', renew);

module.exports = authRouter;
