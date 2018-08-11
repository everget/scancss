import { unique } from '../../converters/unique';
import { cssSystemColors } from '.';

describe('Module: cssSystemColors', () => {
	it('should have unique values', () => {
		expect(unique(cssSystemColors).length).toBe(cssSystemColors.length);
	});
});
