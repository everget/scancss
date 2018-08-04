import { restoreFullHex } from '.';

describe('Module: restoreFullHex', () => {
	describe('HEX colors', () => {
		const hex3ColorSuites = [
			{
				color: '#fff',
				expected: '#ffffff',
			},
			{
				color: '#123',
				expected: '#112233',
			},
			{
				color: '#f21',
				expected: '#ff2211',
			},
		];

		hex3ColorSuites.forEach((suite) => {
			it(`should convert ${suite.color} to ${suite.expected}`, () => {
				expect(restoreFullHex(suite.color)).toBe(suite.expected);
			});
		});
	});

	describe('HEXA colors', () => {
		const hex4ColorSuites = [
			{
				color: '#abcd',
				expected: '#aabbccdd',
			},
			{
				color: '#f210',
				expected: '#ff221100',
			},
			{
				color: '#123f',
				expected: '#112233ff',
			},
		];

		hex4ColorSuites.forEach((suite) => {
			it(`should convert ${suite.color} to ${suite.expected}`, () => {
				expect(restoreFullHex(suite.color)).toBe(suite.expected);
			});
		});
	});
});
