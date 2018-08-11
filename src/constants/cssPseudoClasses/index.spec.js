import { intersection } from '../../converters/intersection';
import { unique } from '../../converters/unique';
import { cssPseudoElements } from '../cssPseudoElements';
import { cssPseudoClasses } from '.';

describe('Module: cssPseudoClasses', () => {
	it('should have unique values', () => {
		expect(unique(cssPseudoClasses).length).toBe(cssPseudoClasses.length);
	});

	it('should not have intersections with `cssPseudoElements`', () => {
		expect(intersection(cssPseudoClasses, cssPseudoElements)).toEqual([]);
	});
});
