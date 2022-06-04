const eventsRouter = require('express').Router();
const { check } = require('express-validator');
const { isDate, isEmpty } = require('../utils/customsValidators');
const { validateJWT, validatorHandler } = require('../utils/middlewares');

const {
	createEvent,
	getEvents,
	updateEvent,
	deleteEvent
} = require('../controllers/events');

if (process.env.NODE_ENV == 'production') {
	eventsRouter.use(validateJWT);
}
// this just for dev purposes
eventsRouter.use(validateJWT);

eventsRouter.get('/', getEvents);

eventsRouter.post(
	'/',
	[
		check('title', 'title is required').notEmpty().isString(),
		check('start', 'start date is required and/or valid').isDate(),
		check('end', 'end date is required and/or valid').isDate(),
		validatorHandler
	],
	createEvent
);

eventsRouter.put(
	'/:id',
	[
		check('title', 'title is required').notEmpty().isString(),
		check('start', 'start date is required and/or valid').isDate(),
		check('end', 'end date is required and/or valid').isDate(),
		validatorHandler
	],
	updateEvent
);

eventsRouter.delete('/:id', deleteEvent);

module.exports = eventsRouter;
