import { unique } from '../../converters/unique';
import { cssMsPseudoElements } from '.';

describe('Module: cssMsPseudoElements', () => {
	it('should have unique values', () => {
		expect(unique(cssMsPseudoElements).length).toBe(cssMsPseudoElements.length);
	});
});
