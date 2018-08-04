import { roundDivision } from '.';

describe('Module: roundDivision', () => {
	describe('Different precisions', () => {
		const suites = [
			{
				precision: undefined,
				expected: 3.1415929203539825,
			},
			{
				precision: 1,
				expected: 3.1,
			},
			{
				precision: 2,
				expected: 3.14,
			},
			{
				precision: 3,
				expected: 3.142,
			},
			{
				precision: 5,
				expected: 3.14159,
			},
			{
				precision: 8,
				expected: 3.14159292,
			},
			{
				precision: 13,
				expected: 3.1415929203540,
			},
		];

		suites.forEach((suite) => {
			it(`should return division result with ${suite.precision} decimal digits`, () => {
				expect(roundDivision(355, 113, suite.precision)).toBe(suite.expected);
			});
		});
	});

	describe('Division by zero', () => {
		const expectedReturn = 0;
		it(`should return ${expectedReturn} if divisor equals to 0`, () => {
			expect(roundDivision(10, 0, 2)).toBe(expectedReturn);
		});
	});
});
