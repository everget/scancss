import { unique } from '../../converters/unique';
import { cssUnits } from '.';

describe('Module: cssUnits', () => {
	it('should have unique values', () => {
		expect(unique(cssUnits).length).toBe(cssUnits.length);
	});
});
