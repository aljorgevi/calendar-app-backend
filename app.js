const express = require('express');
const app = express();
const logger = require('./utils/loggers');

logger.info('connecting to...');

// TODO: move route to separate file
app.get('/', (req, res) => {
	console.log('request received');
	res.json({
		message: 'Hello World!'
	});
});

module.exports = app;
