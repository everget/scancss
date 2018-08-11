import { unique } from '../../converters/unique';
import { cssNamedTimingFunctions } from '.';

describe('Module: cssNamedTimingFunctions', () => {
	it('should have unique values', () => {
		expect(unique(cssNamedTimingFunctions).length).toBe(cssNamedTimingFunctions.length);
	});
});
