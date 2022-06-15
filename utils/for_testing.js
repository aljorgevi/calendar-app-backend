const palindrome = string => {
	if (typeof string === 'undefined') return undefined;

	return string.split('').reverse().join('');
};

const average = numbers => {
	if (numbers.length === 0) return 0;
	return numbers.reduce((acc, el) => acc + el, 0) / numbers.length;
};

module.exports = { palindrome, average };
