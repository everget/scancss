import { parseCss } from '../../converters/parseCss';
import { handleFloatProperty } from '.';

describe('Module: handleFloatProperty', () => {
	const src = `
		.selector {
			float: left;
		}

		.selector {
			float: right;
		}

		.selector {
			float: none;
		}

		.selector {
			float: inherit;
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = {
			floats: {
				total: 0,
				unique: 0,
				usage: {},
			},
		};

		cssRoot.walkDecls((decl) => {
			handleFloatProperty(decl, report);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('floats.total', () => {
		it('should be counted correctly', () => {
			expect(report.floats.total).toBe(4);
		});
	});

	describe('floats.unique', () => {
		it('should be counted correctly', () => {
			expect(report.floats.unique).toBe(0);
		});
	});

	describe('floats.usage', () => {
		it('should be counted correctly', () => {
			expect(report.floats.usage).toEqual({
				left: 1,
				right: 1,
				none: 1,
				inherit: 1,
			});
		});
	});
});
