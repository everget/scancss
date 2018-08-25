import { intersection } from '../../converters/intersection';
import { unique } from '../../converters/unique';
import { cssMozPseudoElements } from '../cssMozPseudoElements';
import { cssMozPseudoClasses } from '.';

describe('Module: cssMozPseudoClasses', () => {
	it('should have unique values', () => {
		expect(unique(cssMozPseudoClasses).length).toBe(cssMozPseudoClasses.length);
	});

	it('should not have intersections with `cssMozPseudoElements`', () => {
		expect(intersection(cssMozPseudoClasses, cssMozPseudoElements)).toStrictEqual([]);
	});
});
