import { unique } from '../../converters/unique';
import { cssWebkitMediaFeatures } from '.';

describe('Module: cssWebkitMediaFeatures', () => {
	it('should have unique values', () => {
		expect(unique(cssWebkitMediaFeatures).length).toBe(cssWebkitMediaFeatures.length);
	});
});
