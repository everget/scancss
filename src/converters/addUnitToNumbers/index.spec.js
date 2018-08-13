import { addUnitToNumbers } from '.';

describe('Module: addUnitToNumbers', () => {
	const suites = [
		{
			str: '0.001 0.01 0.1 .1 1 666',
			expected: '0.001px 0.01px 0.1px .1px 1px 666px',
		},
		{
			str: '0.001, 0.01, 0.1, .1, 1, 666',
			expected: '0.001px, 0.01px, 0.1px, .1px, 1px, 666px',
		},
	];

	suites.forEach((suite) => {
		it(`should add units to numbers in string ${suite.str}`, () => {
			expect(addUnitToNumbers(suite.str, 'px')).toBe(suite.expected);
		});
	});
});
