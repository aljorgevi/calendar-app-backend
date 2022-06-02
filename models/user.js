const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

// This makes error handling much easier,
// since you will get a Mongoose validation error when you attempt to violate a unique constraint, rather than an E11000 error from MongoDB.
// we handle this in middlewares, errorHandler method.
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
