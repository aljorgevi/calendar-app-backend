const Event = require('../models/event');
const User = require('../models/user');

/*
 ** This create a event, getting the ids of the user from the jwt token.
 ** then, get the user from the DB amd pass the id ref to the event.
 */
const createEvent = async (request, response) => {
	const body = request.body;
	const { _userId } = request;

	const user = await User.findById(_userId);

	const event = new Event({
		...body,
		user: user._id
	});

	const savedEvent = await event.save();

	// user.events = user.notes.concat(savedNote._id);
	// await user.save();

	response.json(savedEvent);
};

const getEvents = async (request, response, next) => {
	const events = await Event.find({}).populate('user', 'username');
	return response.json(events);
};

const updateEvent = async (request, response, next) => {
	const body = request.body;
	const eventId = request.params.id;
	const { _userId } = request;

	const event = await Event.findByIdAndUpdate(eventId);
	if (!event) {
		return response.status(404).json({
			error: 'event not found'
		});
	}

	if (event.user.toString() !== _userId) {
		return response.status(401).json({
			error: 'not authorized'
		});
	}

	const updatedEvent = {
		...body,
		user: _userId
	};

	const savedEvent = await Event.findByIdAndUpdate(eventId, updatedEvent, {
		new: true
	});

	response.json(savedEvent);
};

const deleteEvent = async (request, response, next) => {
	const eventId = request.params.id;
	const { _userId } = request;

	const event = await Event.findByIdAndUpdate(eventId);
	if (!event) {
		return response.status(404).json({
			error: 'event not found'
		});
	}

	if (event.user.toString() !== _userId) {
		return response.status(401).json({
			error: 'not authorized'
		});
	}

	await Event.findByIdAndRemove(request.params.id);
	response.status(204).end();
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };
