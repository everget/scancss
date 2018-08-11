const fs = require('fs');
const path = require('path');
const scancss = require('../../dist/index').default;
const walkDir = require('./walkDir');

function timeNow() {
	const hrtime = process.hrtime();
	return ((hrtime[0] * 1e6 + hrtime[1] / 1e3) / 1e3);
}

module.exports = function scan(dir) {
	function fileHandler(file) {
		const stylesheetData = fs.readFileSync(file, 'utf8');
		console.log(`\nScan ${path.basename(file)} ...\n`);

		const startTime = timeNow();
		const scanResult = scancss(
			stylesheetData,
			{
				selectorsUsage: false,
				specificityGraph: false,
				uniqueDeclarationsList: false,
			}
		);

		fs.writeFileSync(
			file.slice(0, -3) + 'report.json',
			JSON.stringify(scanResult, null, 2),
		);

		console.log('Time Spent: ' + (timeNow() - startTime).toFixed(2) + 'ms');
	}

	walkDir(dir, fileHandler, (err) => {
		if (err) {
			throw err;
		}
	});
}
