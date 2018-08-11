import { unique } from '../../converters/unique';
import { cssPseudoElements } from '.';

describe('Module: cssPseudoElements', () => {
	it('should have unique values', () => {
		expect(unique(cssPseudoElements).length).toBe(cssPseudoElements.length);
	});
});
