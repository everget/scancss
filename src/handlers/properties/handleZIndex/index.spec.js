import { getEmptyReport } from '../../../common/getEmptyReport';
import { parseCss } from '../../../common/parseCss';
import { handleZIndex } from '.';

describe('Module: handleZIndex', () => {
	const src = `
		.selector {
			z-index: -1;
		}

		.selector {
			z-index: 1;
		}

		.selector {
			z-index: 100;
		}

		.selector {
			z-index: 9999;
		}

		.selector {
			z-index: inherit;
		}

		.selector {
			z-index: initial;
		}

		.selector {
			z-index: revert;
		}

		.selector {
			z-index: unset;
		}

		.selector {
			z-index: calc(24 - 10);
		}

		.selector {
			z-index: --z-index-content-page;
		}

		.selector {
			z-index: xxx;
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = getEmptyReport();

		cssRoot.walkDecls((decl) => {
			handleZIndex(decl, report);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('zIndices.total', () => {
		it('should be counted correctly', () => {
			expect(report.zIndices.total).toBe(11);
		});
	});

	describe('zIndices.unique', () => {
		it('should be counted correctly', () => {
			expect(report.zIndices.unique).toBe(0);
		});
	});

	describe('zIndices.invalid', () => {
		it('should be counted correctly', () => {
			expect(report.zIndices.invalid).toStrictEqual({
				xxx: 1,
			});
		});
	});

	describe('zIndices.usage', () => {
		it('should be counted correctly', () => {
			/* eslint-disable quote-props */
			expect(report.zIndices.usage).toStrictEqual({
				'-1': 1,
				'1': 1,
				'100': 1,
				'9999': 1,
				initial: 1,
				inherit: 1,
				revert: 1,
				unset: 1,
				'calc(24 - 10)': 1,
				'--z-index-content-page': 1,
				xxx: 1,
			});
			/* eslint-enable quote-props */
		});
	});
});
