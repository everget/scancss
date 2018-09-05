import { intersection } from '../../converters/intersection';
import { unique } from '../../converters/unique';
import { cssWebkitPseudoElements } from '../cssWebkitPseudoElements';
import { cssWebkitPseudoClasses } from '.';

describe('Module: cssWebkitPseudoClasses', () => {
	it('should have unique values', () => {
		expect(unique(cssWebkitPseudoClasses).length).toBe(cssWebkitPseudoClasses.length);
	});

	it('should not have intersections with `cssWebkitPseudoElements`', () => {
		expect(intersection(cssWebkitPseudoClasses, cssWebkitPseudoElements)).toStrictEqual([]);
	});
});
