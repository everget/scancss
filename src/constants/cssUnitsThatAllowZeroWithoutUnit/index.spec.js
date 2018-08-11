import { unique } from '../../converters/unique';
import { cssUnitsThatAllowZeroWithoutUnit } from '.';

describe('Module: cssUnitsThatAllowZeroWithoutUnit', () => {
	it('should have unique values', () => {
		expect(unique(cssUnitsThatAllowZeroWithoutUnit).length).toBe(cssUnitsThatAllowZeroWithoutUnit.length);
	});
});
