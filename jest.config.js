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
	moduleDirectories: [
		'node_modules',
		'<rootDir>/src',
	],
	moduleFileExtensions: [
		'js',
	],
	modulePathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/coverage/',
		'<rootDir>/.eslintcache/',
	],
	testEnvironment: 'node',
	coverageReporters: [
		'json',
		'lcov',
	],
	transform: {
		'.js': '<rootDir>/node_modules/babel-jest',
	},
};
