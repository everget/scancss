import { cssVendorPrefixes } from '../cssVendorPrefixes';
import { rePrefixedString } from '.';

describe('Module: rePrefixedString', () => {
	describe('Positives', () => {
		cssVendorPrefixes
			.filter((prefix) => prefix.startsWith('-') === true)
			.forEach((prefix) => {
				it(`should match ${prefix}`, () => {
					expect(prefix.match(rePrefixedString)[0]).toBe(prefix);
				});
			});
	});

	describe('Negatives', () => {
		const valuesWithoutPrefixes = [
			'foo',
			'bar',
			'baz',
			'foo-',
			'bar-',
			'baz-',
			'mozz-',
			'edge-',
		];

		valuesWithoutPrefixes.forEach((value) => {
			it(`should not match value without prefix ${value}`, () => {
				expect(value.match(rePrefixedString)).toBe(null);
			});
		});
	});
});
