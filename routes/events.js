const eventsRouter = require('express').Router();
const {
	createEvent,
	getEvents,
	updateEvent,
	deleteEvent
} = require('../controllers/events');

eventsRouter.get('/', getEvents);

eventsRouter.post('/', createEvent);

eventsRouter.put('/:id', updateEvent);

eventsRouter.delete('/:id', deleteEvent);

module.exports = eventsRouter;
