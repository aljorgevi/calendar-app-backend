const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const loggers = require('./utils/loggers');

const server = http.createServer(app);

server.listen(config.PORT, () => {
	loggers.info(`Server is running on port ${config.PORT}`);
	loggers.info(`visit http://localhost:${config.PORT}`);
});
