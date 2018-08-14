import { unique } from '../../converters/unique';
import { cssShorthandProperties } from '.';

describe('Module: cssShorthandProperties', () => {
	it('should have unique values in every section', () => {
		Object
			.values(cssShorthandProperties)
			.forEach((props) => {
				expect(unique(props).length).toBe(props.length);
			});
	});
});
