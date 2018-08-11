import { unique } from '../../converters/unique';
import { cssMozPseudoElements } from '.';

describe('Module: cssMozPseudoElements', () => {
	it('should have unique values', () => {
		expect(unique(cssMozPseudoElements).length).toBe(cssMozPseudoElements.length);
	});
});
