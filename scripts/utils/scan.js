const fs = require('fs');
const path = require('path');
const scancss = require('../../dist/index').default;
const walkDir = require('./walkDir');

module.exports = function scan(dir) {
	function fileHandler(file) {
		const stylesheetData = fs.readFileSync(file, 'utf8');
		console.log(`\nScan ${path.basename(file)} ...\n`);
		const startedAt = Date.now();
		const scanResult = scancss(
			stylesheetData,
			{
				collectSelectorsUsage: false,
				collectSpecificityGraphData: false,
				collectDeclarationsList: false,
			}
		);

		fs.writeFileSync(
			file.slice(0, -3) + 'report.json',
			JSON.stringify(scanResult, null, 2),
		);

		const timeSpent = Date.now() - startedAt;
		console.log(`Time Spent: ${timeSpent / 1000}s`);
	}

	walkDir(dir, fileHandler, (err, results) => {
		if (err) {
			throw err;
		}
	});
}
