const moment = require('moment');
const _ = require('lodash');

// const isDate = date => {
// 	const regEx = /^\d{4}-\d{2}-\d{2}$/;
// 	if (!date.match(regEx)) return false;
// 	const d = new Date(date);
// 	if (Number.isNaN(d.getTime())) return false;
// 	return d.toISOString().substring(0, 10) === date;
// };

const isDate = (value, { request, location, path }) => {
	console.log({ value, request, location, path });
	if (!value) {
		return false;
	}

	const date = moment(value);
	if (date.isValid()) {
		console.log({ date });
		return true;
	}

	return false;
};

const isEmpty = value => !_.isEmpty(value);

module.exports = { isDate, isEmpty };
