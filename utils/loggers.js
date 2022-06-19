let ShouldTestEnvHaveLogger = process.env.NODE_ENV !== 'test';
/* comment next line if logger is not req in test env */
ShouldTestEnvHaveLogger = true;

const info = (...props) => {
	if (ShouldTestEnvHaveLogger) {
		console.log(...props);
	}
};

const error = (...props) => {
	if (ShouldTestEnvHaveLogger) {
		console.error(...props);
	}
};

module.exports = {
	info,
	error
};

//
