import { getEmptyReport } from '../../../common/getEmptyReport';
import { parseCss } from '../../../common/parseCss';
import { handleFloat } from '.';

describe('Module: handleFloat', () => {
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
		report = getEmptyReport();

		cssRoot.walkDecls((decl) => {
			handleFloat(decl, report);
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
			expect(report.floats.usage).toStrictEqual({
				left: 1,
				right: 1,
				none: 1,
				inherit: 1,
			});
		});
	});
});
