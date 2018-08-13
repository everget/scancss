import { addSpacesNearCommas } from '.';

describe('Module: addSpacesNearCommas', () => {
	describe('Default', () => {
		const suites = [
			{
				str: 'foo,bar,baz',
				expected: 'foo  ,  bar  ,  baz',
			},
			{
				str: 'foo , bar , baz',
				expected: 'foo   ,   bar   ,   baz',
			},
		];

		suites.forEach((suite) => {
			it(`should add new spaces near commas in string ${suite.str}`, () => {
				expect(addSpacesNearCommas(suite.str)).toBe(suite.expected);
			});
		});
	});

	describe('Before: 1, After: 2', () => {
		const suites = [
			{
				str: 'foo,bar,baz',
				expected: 'foo ,  bar ,  baz',
			},
			{
				str: 'foo , bar , baz',
				expected: 'foo  ,   bar  ,   baz',
			},
		];

		suites.forEach((suite) => {
			it(`should add new spaces near commas in string ${suite.str}`, () => {
				expect(addSpacesNearCommas(suite.str, 1, 2)).toBe(suite.expected);
			});
		});
	});

	describe('Before: 2, After: 1', () => {
		const suites = [
			{
				str: 'foo,bar,baz',
				expected: 'foo  , bar  , baz',
			},
			{
				str: 'foo , bar , baz',
				expected: 'foo   ,  bar   ,  baz',
			},
		];

		suites.forEach((suite) => {
			it(`should add new spaces near commas in string ${suite.str}`, () => {
				expect(addSpacesNearCommas(suite.str, 2, 1)).toBe(suite.expected);
			});
		});
	});

	describe('Before: 3, After: 3', () => {
		const suites = [
			{
				str: 'foo,bar,baz',
				expected: 'foo   ,   bar   ,   baz',
			},
			{
				str: 'foo , bar , baz',
				expected: 'foo    ,    bar    ,    baz',
			},
		];

		suites.forEach((suite) => {
			it(`should add new spaces near commas in string ${suite.str}`, () => {
				expect(addSpacesNearCommas(suite.str, 3, 3)).toBe(suite.expected);
			});
		});
	});
});
