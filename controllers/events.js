const jwt = require('jsonwebtoken');
const Event = require('../models/event');
const User = require('../models/user');
const { getTokenFrom } = require('../utils/helpers');

const createEvent = async (request, response) => {
	const body = request.body;
	const token = getTokenFrom(request);
	const decodedToken = jwt.verify(token, process.env.SECRET);

	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}

	const user = await User.findById(decodedToken.id);

	const event = new Event({
		...body,
		creationDate: new Date(),
		asOfTime: new Date(),
		user: user._id
	});

	const returnedObject = await event.save();
	// user.events = user.notes.concat(savedNote._id);
	// await user.save();

	// TODO: instead of user, change to creator or createdBy
	const savedEvent = {
		id: returnedObject.id,
		user: returnedObject.user,
		creationDate: returnedObject.creationDate,
		asOfTime: returnedObject.asOfTime,
		title: returnedObject.title,
		notes: returnedObject.notes,
		start: returnedObject.start,
		end: returnedObject.end
	};

	response.json(savedEvent);
};

const getEvents = (request, response, next) => {
	response.send('get events');
};

const updateEvent = (request, response, next) => {
	response.send('update events');
};

const deleteEvent = (request, response, next) => {
	response.send('delete events');
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };
