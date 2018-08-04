module.exports = {
	forceExit: true,
	verbose: true,
	testMatch: [
		'<rootDir>/src/**/*.spec.js',
	],
	watchPathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/coverage/',
		'<rootDir>/.eslintcache/',
	],
	modulePathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/coverage/',
		'<rootDir>/.eslintcache/',
	],
	testEnvironment: 'node',
	coverageReporters: [
		'json',
	],
	transform: {
		'.js': '<rootDir>/node_modules/babel-jest',
	},
};
