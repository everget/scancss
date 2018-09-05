const fs = require('fs');
const path = require('path');
const scancss = require('../../dist/index');
const timeNow = require('./timeNow');
const walkDir = require('./walkDir');

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
			file.replace(/css$/, '') + 'report.json',
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
