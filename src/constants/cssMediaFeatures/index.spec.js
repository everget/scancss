import { unique } from '../../converters/unique';
import { cssMediaFeatures } from '.';

describe('Module: cssMediaFeatures', () => {
	it('should have unique values', () => {
		expect(unique(cssMediaFeatures).length).toBe(cssMediaFeatures.length);
	});
});
