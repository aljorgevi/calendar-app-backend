const createEvent = (reqquest, response, next) => {
	// response hello world
	response.send('hello world');
};

const getEvents = (reqquest, response, next) => {
	response.send('get events');
};

const updateEvent = (reqquest, response, next) => {
	response.send('update events');
};

const deleteEvent = (reqquest, response, next) => {
	response.send('delete events');
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };
