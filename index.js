const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/loggers');

const server = http.createServer(app);

server.listen(config.PORT, () => {
	logger.info(`Server is running on port ${config.PORT}`);
	logger.info(`visit http://localhost:${config.PORT}`);
});
