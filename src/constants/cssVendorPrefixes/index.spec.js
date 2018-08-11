import { unique } from '../../converters/unique';
import { cssVendorPrefixes } from '.';

describe('Module: cssVendorPrefixes', () => {
	it('should have unique values', () => {
		expect(unique(cssVendorPrefixes).length).toBe(cssVendorPrefixes.length);
	});
});
