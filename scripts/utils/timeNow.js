module.exports = function timeNow() {
	const hrtime = process.hrtime();
	return ((hrtime[0] * 1e6 + hrtime[1] / 1e3) / 1e3);
};
