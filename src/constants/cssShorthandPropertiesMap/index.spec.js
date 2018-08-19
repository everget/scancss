import { unique } from '../../converters/unique';
import { cssShorthandPropertiesMap } from '.';

describe('Module: cssShorthandPropertiesMap', () => {
	it('should have unique values in every section', () => {
		Object
			.values(cssShorthandPropertiesMap)
			.forEach((props) => {
				expect(unique(props).length).toBe(props.length);
			});
	});
});
