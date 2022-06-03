const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const eventSchema = new mongoose.Schema({
	title: String,
	notes: String,
	start: Date,
	end: Date,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

// This makes error handling much easier,
// since you will get a Mongoose validation error when you attempt to violate a unique constraint, rather than an E11000 error from MongoDB.
// we handle this in middlewares, errorHandler method.
userSchema.plugin(uniqueValidator);

// userSchema.set('toJSON', {
// 	transform: (document, returnedObject) => {
// 		returnedObject.id = returnedObject._id.toString();
// 		delete returnedObject._id;
// 		delete returnedObject.__v;
// 		// the passwordHash should not be revealed
// 		delete returnedObject.passwordHash;
// 	}
// });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
