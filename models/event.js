const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const eventSchema = new mongoose.Schema(
	{
		title: String,
		notes: String,
		start: Date,
		end: Date,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{
		timestamps: true
	}
);

// This makes error handling much easier,
// since you will get a Mongoose validation error when you attempt to violate a unique constraint, rather than an E11000 error from MongoDB.
// we handle this in middlewares, errorHandler method.
eventSchema.plugin(uniqueValidator);

// eventSchema.set('toJSON', {
// 	transform: (document, returnedObject) => {
// 		returnedObject.id = returnedObject._id.toString();
// 		returnedObject.createdAt = returnedObject.createdAt.toISOString();
// 		returnedObject.updatedAt = returnedObject.updatedAt.toISOString();
// 		delete returnedObject._id;
// 		delete returnedObject.__v;
// 	}
// });

// other way to do it
eventSchema.method('toJSON', function () {
	const { __v, _id, user, ...object } = this.toObject();
	return {
		id: _id,
		user,
		...object
	};
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
