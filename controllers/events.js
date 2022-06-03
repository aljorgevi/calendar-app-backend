const jwt = require('jsonwebtoken');
const moment = require('moment');
const Event = require('../models/event');
const User = require('../models/user');
const { getTokenFrom } = require('../utils/helpers');

/*
 ** This create a event, getting the ids of the user from the jwt token.
 ** then, get the user from the DB amd pass the id ref to the event.
 */
const createEvent = async (request, response) => {
	const body = request.body;
	const token = getTokenFrom(request);
	const decodedToken = jwt.verify(token, process.env.SECRET);

	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}

	const user = await User.findById(decodedToken.id);

	let date = Date.now();
	let timeNow = moment(new Date(date)).format('YYYY-MM-DD');

	const event = new Event({
		...body,
		creationDate: timeNow,
		asOfTime: timeNow,
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

const getEvents = async (request, response, next) => {
	const events = await Event.find({}).populate('user', 'username');
	return response.json(events);
};

const updateEvent = (request, response, next) => {
	response.send('update events');
};

const deleteEvent = (request, response, next) => {
	response.send('delete events');
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };
