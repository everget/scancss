import { addSpacesNearParentheses } from '.';

describe('Module: addSpacesNearParentheses', () => {
	describe('Default', () => {
		const suites = [
			{
				str: 'foo()',
				expected: 'foo(    )',
			},
			{
				str: 'foo() bar(), baz()',
				expected: 'foo(    ) bar(    ), baz(    )',
			},
		];

		suites.forEach((suite) => {
			it(`should add new spaces near parentheses in string ${suite.str}`, () => {
				expect(addSpacesNearParentheses(suite.str)).toBe(suite.expected);
			});
		});
	});

	describe('Before: 1, After: 1', () => {
		const suites = [
			{
				str: 'foo()',
				expected: 'foo(  )',
			},
			{
				str: 'foo() bar(), baz()',
				expected: 'foo(  ) bar(  ), baz(  )',
			},
		];

		suites.forEach((suite) => {
			it(`should add new spaces near parentheses in string ${suite.str}`, () => {
				expect(addSpacesNearParentheses(suite.str, 1, 1)).toBe(suite.expected);
			});
		});
	});

	describe('Before: 3, After: 3', () => {
		const suites = [
			{
				str: 'foo()',
				expected: 'foo(      )',
			},
			{
				str: 'foo() bar(), baz()',
				expected: 'foo(      ) bar(      ), baz(      )',
			},
		];

		suites.forEach((suite) => {
			it(`should add new spaces near parentheses in string ${suite.str}`, () => {
				expect(addSpacesNearParentheses(suite.str, 3, 3)).toBe(suite.expected);
			});
		});
	});
});
