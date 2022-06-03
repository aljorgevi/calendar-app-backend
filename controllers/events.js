const createEvent = (request, response) => {
	const body = request.body;
	console.log({ body });
	// send json wth status code and body
	return response.status(201).json({
		message: 'success'
	});
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
