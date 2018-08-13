import { addUnitToFirstArgument } from '.';

describe('Module: addUnitToFirstArgument', () => {
	const suites = [
		{
			str: 'hsl(270, 60%, 50%, 1.0) hsl(.75, 60%, 70%, .05) hsl(4.71239, 60%, 70%, 15%)',
			expected: 'hsl(270deg, 60%, 50%, 1.0) hsl(.75deg, 60%, 70%, .05) hsl(4.71239deg, 60%, 70%, 15%)',
		},
		{
			str: 'hsl(270, 60%, 50%, 1.0), hsl(.75, 60%, 70%, .05), hsl(4.71239, 60%, 70%, 15%)',
			expected: 'hsl(270deg, 60%, 50%, 1.0), hsl(.75deg, 60%, 70%, .05), hsl(4.71239deg, 60%, 70%, 15%)',
		},
	];

	suites.forEach((suite) => {
		it(`should add unit to first argument of functions in string ${suite.str}`, () => {
			expect(addUnitToFirstArgument(suite.str, 'deg')).toBe(suite.expected);
		});
	});
});
