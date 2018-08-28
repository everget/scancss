module.exports = {
	forceExit: true,
	verbose: true,
	testEnvironment: 'node',
	testMatch: [
		'<rootDir>/src/**/*.spec.js',
	],
	transform: {
		'.js': '<rootDir>/node_modules/babel-jest',
	},
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
	coverageDirectory: '<rootDir>/coverage',
	coveragePathIgnorePatterns: [
		'<rootDir>/dev-docs',
		'<rootDir>/examples',
		'<rootDir>/scripts',
		'<rootDir>/node_modules',
	],
	coverageReporters: [
		'json',
		'lcov',
	],
};
