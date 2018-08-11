import { unique } from '../../converters/unique';
import { cssMozMediaFeatures } from '.';

describe('Module: cssMozMediaFeatures', () => {
	it('should have unique values', () => {
		expect(unique(cssMozMediaFeatures).length).toBe(cssMozMediaFeatures.length);
	});
});
