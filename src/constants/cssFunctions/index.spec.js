import { unique } from '../../converters/unique';
import { cssFunctions } from '.';

describe('Module: cssFunctions', () => {
	it('should have unique values', () => {
		expect(unique(cssFunctions).length).toBe(cssFunctions.length);
	});
});
