import { getEmptyReport } from '../../../common/getEmptyReport';
import { parseCss } from '../../../common/parseCss';
import { handleLetterSpacing } from '.';

describe('Module: handleLetterSpacing', () => {
	const src = `
		.selector {
			letter-spacing: normal;
		}

		.selector {
			letter-spacing: .3px;
		}

		.selector {
			letter-spacing: 0.3em;
		}

		.selector {
			letter-spacing: -1px;
		}

		.selector {
			letter-spacing: .2rem;
		}

		.selector {
			letter-spacing: inherit;
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = getEmptyReport();

		cssRoot.walkDecls((decl) => {
			handleLetterSpacing(decl, report);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('letterSpacings.total', () => {
		it('should be counted correctly', () => {
			expect(report.letterSpacings.total).toBe(6);
		});
	});

	describe('letterSpacings.unique', () => {
		it('should be counted correctly', () => {
			expect(report.letterSpacings.unique).toBe(0);
		});
	});

	describe('letterSpacings.usage', () => {
		it('should be counted correctly', () => {
			expect(report.letterSpacings.usage).toStrictEqual({
				normal: 1,
				'.3px': 1,
				'0.3em': 1,
				'-1px': 1,
				'.2rem': 1,
				inherit: 1,
			});
		});
	});
});
