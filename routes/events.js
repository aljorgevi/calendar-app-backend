const eventsRouter = require('express').Router();
const middleware = require('../utils/middlewares');

const {
	createEvent,
	getEvents,
	updateEvent,
	deleteEvent
} = require('../controllers/events');

if (process.env.NODE_ENV === 'production') {
	eventsRouter.use(middleware.validateJWT);
}

eventsRouter.get('/', getEvents);

eventsRouter.post('/', createEvent);

eventsRouter.put('/:id', updateEvent);

eventsRouter.delete('/:id', deleteEvent);

module.exports = eventsRouter;
