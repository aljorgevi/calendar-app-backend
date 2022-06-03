const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true
		},
		email: {
			type: String,
			unique: true,
			required: true
		},
		passwordHash: String
	},
	{
		timestamps: true
	}
);

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
userSchema.method('toJSON', function () {
	const { __v, _id, passwordHash, ...object } = this.toObject();
	return {
		id: _id,
		...object
	};
});

const User = mongoose.model('User', userSchema);

module.exports = User;
