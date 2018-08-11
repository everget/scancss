import { unique } from '../../converters/unique';
import { cssAtRules } from '.';

describe('Module: cssAtRules', () => {
	it('should have unique values', () => {
		expect(unique(cssAtRules).length).toBe(cssAtRules.length);
	});
});
