const fs = require('fs');
const path = require('path');

module.exports = function walkDir(dir, handler, doneCallback) {
	const list = fs.readdirSync(dir);
	const jsonFilesList = list.filter((file) => path.extname(file) === '.json');

	jsonFilesList.forEach((file) => {
		fs.unlinkSync(path.resolve(dir, file));
	});

	const cssFilesList = list.filter((file) => path.extname(file) === '.css');
	let pending = cssFilesList.length;
	let results = [];

	cssFilesList.forEach((file) => {
		if (typeof handler === 'function') {
			handler(path.resolve(dir, file));
			results.push(file);
		}

		if (!--pending && typeof doneCallback === 'function') {
			doneCallback(null, results);
		}
	});
};
