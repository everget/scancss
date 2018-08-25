import { getEmptyReport } from '../../../common/getEmptyReport';
import { parseCss } from '../../../common/parseCss';
import { handleHeight } from '.';

describe('Module: handleHeight', () => {
	const src = `
		.selector {
			height: 300px;
		}

		.selector {
			height: 25em;
		}

		.selector {
			height: 75%;
		}

		.selector {
			height: 25em border-box;
		}

		.selector {
			height: 75% content-box;
		}

		.selector {
			height: max-content;
		}

		.selector {
			height: min-content;
		}

		.selector {
			height: available;
		}

		.selector {
			height: fit-content;
		}

		.selector {
			height: auto;
		}

		.selector {
			height: initial;
		}

		.selector {
			height: unset;
		}

		.selector {
			height: revert;
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = getEmptyReport();

		cssRoot.walkDecls((decl) => {
			handleHeight(decl, report);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('heights.total', () => {
		it('should be counted correctly', () => {
			expect(report.heights.total).toBe(13);
		});
	});

	describe('heights.unique', () => {
		it('should be counted correctly', () => {
			expect(report.heights.unique).toBe(0);
		});
	});

	describe('heights.usage', () => {
		it('should be counted correctly', () => {
			expect(report.heights.usage).toStrictEqual({
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
