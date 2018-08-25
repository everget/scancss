const clearRequire = require('clear-require');
const timeNow = require('./utils/timeNow');

const samples = [];
let startTime;
let timeSpent;

startTime = timeNow();
require('../dist/index');
timeSpent = timeNow() - startTime;
samples.push(timeSpent);
clearRequire('../dist/index');

startTime = timeNow();
require('../dist/index');
timeSpent = timeNow() - startTime;
samples.push(timeSpent);
clearRequire('../dist/index');

startTime = timeNow();
require('../dist/index');
timeSpent = timeNow() - startTime;
samples.push(timeSpent);
clearRequire('../dist/index');

startTime = timeNow();
require('../dist/index');
timeSpent = timeNow() - startTime;
samples.push(timeSpent);
clearRequire('../dist/index');

startTime = timeNow();
require('../dist/index');
timeSpent = timeNow() - startTime;
samples.push(timeSpent);
clearRequire('../dist/index');

console.log('Samples:\n' + samples.join('\n'));

const meanTime = samples.reduce((acc, time) => acc += time, 0) / samples.length;
console.log('Mean time: ' + meanTime + 'ms');
