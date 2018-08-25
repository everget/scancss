import { getEmptyReport } from '../../../common/getEmptyReport';
import { parseCss } from '../../../common/parseCss';
import { handleWidth } from '.';

describe('Module: handleWidth', () => {
	const src = `
		.selector {
			width: 300px;
		}

		.selector {
			width: 25em;
		}

		.selector {
			width: 75%;
		}

		.selector {
			width: 25em border-box;
		}

		.selector {
			width: 75% content-box;
		}

		.selector {
			width: max-content;
		}

		.selector {
			width: min-content;
		}

		.selector {
			width: available;
		}

		.selector {
			width: fit-content;
		}

		.selector {
			width: auto;
		}

		.selector {
			width: initial;
		}

		.selector {
			width: unset;
		}

		.selector {
			width: revert;
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = getEmptyReport();

		cssRoot.walkDecls((decl) => {
			handleWidth(decl, report);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('widths.total', () => {
		it('should be counted correctly', () => {
			expect(report.widths.total).toBe(13);
		});
	});

	describe('widths.unique', () => {
		it('should be counted correctly', () => {
			expect(report.widths.unique).toBe(0);
		});
	});

	describe('widths.usage', () => {
		it('should be counted correctly', () => {
			expect(report.widths.usage).toStrictEqual({
				'300px': 1,
				'25em': 1,
				'75%': 1,
				'25em border-box': 1,
				'75% content-box': 1,
				'max-content': 1,
				'min-content': 1,
				available: 1,
				'fit-content': 1,
				auto: 1,
				initial: 1,
				unset: 1,
				revert: 1,
			});
		});
	});
});
