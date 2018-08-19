import { percentDifference } from '.';

describe('Module: percentDifference', () => {
	describe('Calculating percent difference', () => {
		const suites = [
			{
				original: 167123,
				processed: 138632,
				expected: '82.95%',
			},
			{
				original: 146007,
				processed: 114377,
				expected: '78.34%',
			},
			{
				original: 53049,
				processed: 17994,
				expected: '33.92%',
			},
			{
				original: 37413,
				processed: 30662,
				expected: '81.96%',
			},
			{
				original: 17422,
				processed: 10696,
				expected: '61.39%',
			},
			{
				original: 7718,
				processed: 2178,
				expected: '28.22%',
			},
			{
				original: 1092,
				processed: 773,
				expected: '70.79%',
			},
		];

		suites.forEach((suite) => {
			it(`should return correct percent difference for original: ${suite.original} and processed: ${suite.processed} values`, () => {
				expect(percentDifference(suite.original, suite.processed)).toBe(suite.expected);
			});
		});
	});

	// describe('Division by zero', () => {
	// 	const expectedReturn = 0;
	// 	it(`should return ${expectedReturn} if divisor equals to 0`, () => {
	// 		expect(percentDifference(10, 0, 2)).toBe(expectedReturn);
	// 	});
	// });
});
