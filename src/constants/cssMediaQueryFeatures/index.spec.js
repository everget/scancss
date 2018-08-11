import { unique } from '../../converters/unique';
import { cssMediaQueryFeatures } from '.';

describe('Module: cssMediaQueryFeatures', () => {
	it('should have unique values', () => {
		expect(unique(cssMediaQueryFeatures).length).toBe(cssMediaQueryFeatures.length);
	});
});
