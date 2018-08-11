import { unique } from '../../converters/unique';
import { cssColorableProperties } from '.';

describe('Module: cssColorableProperties', () => {
	it('should have unique values', () => {
		expect(unique(cssColorableProperties).length).toBe(cssColorableProperties.length);
	});
});
