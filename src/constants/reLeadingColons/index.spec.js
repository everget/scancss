import { reLeadingColons } from '.';

describe('Module: reLeadingColons', () => {
	describe('Positives', () => {
		it('should match value with one leading colon', () => {
			expect(reLeadingColons.test(':focus')).toBe(true);
		});

		it('should match value with two leading colon', () => {
			expect(reLeadingColons.test('::-moz-placeholder')).toBe(true);
		});
	});

	describe('Negatives', () => {
		const valuesWithoutLeadingColons = [
			'foo',
			'bar',
			'baz',
			'div',
		];

		valuesWithoutLeadingColons.forEach((value) => {
			it(`should not match value without leading colons ${value}`, () => {
				expect(value.match(reLeadingColons)).toBe(null);
			});
		});
	});
});
