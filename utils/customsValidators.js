const moment = require('moment');
const _ = require('lodash');

// const isDate = date => {
// 	const regEx = /^\d{4}-\d{2}-\d{2}$/;
// 	if (!date.match(regEx)) return false;
// 	const d = new Date(date);
// 	if (Number.isNaN(d.getTime())) return false;
// 	return d.toISOString().substring(0, 10) === date;
// };

// was having trouble with this one
const isValidDate = (value, { request, location, path }) => {
	console.log('value:', value);
	if (!value) {
		return false;
	}

	const date = moment(value).format('YYYY-MM-DD');
	console.log({ date });
	if (moment(date).isValid()) {
		console.log('is valid');
		return true;
	}

	return false;
};

const isEmpty = value => !_.isEmpty(value);

module.exports = { isValidDate, isEmpty };
