import { cssVendorPrefixes } from '../cssVendorPrefixes';
import { reExistingVendorPrefix } from '.';

describe('Module: reExistingVendorPrefix', () => {
	describe('Positives', () => {
		cssVendorPrefixes.forEach((prefix) => {
			it(`should match ${prefix}`, () => {
				expect(prefix.match(reExistingVendorPrefix)[0]).toBe(prefix);
			});
		});
	});

	describe('Negatives', () => {
		const notExistingPrefixes = [
			'-foo-',
			'-bar-',
			'-baz-',
			'-mozz-',
			'-edge-',
		];

		notExistingPrefixes.forEach((value) => {
			it(`should not match non-existing prefix ${value}`, () => {
				expect(value.match(reExistingVendorPrefix)).toBe(null);
			});
		});

		const valuesWithoutPrefixes = [
			'foo',
			'bar',
			'baz',
		];

		valuesWithoutPrefixes.forEach((value) => {
			it(`should not match value without prefix ${value}`, () => {
				expect(value.match(reExistingVendorPrefix)).toBe(null);
			});
		});
	});
});
