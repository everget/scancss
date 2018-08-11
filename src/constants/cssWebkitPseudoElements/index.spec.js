import { unique } from '../../converters/unique';
import { cssWebkitPseudoElements } from '.';

describe('Module: cssWebkitPseudoElements', () => {
	it('should have unique values', () => {
		expect(unique(cssWebkitPseudoElements).length).toBe(cssWebkitPseudoElements.length);
	});
});
