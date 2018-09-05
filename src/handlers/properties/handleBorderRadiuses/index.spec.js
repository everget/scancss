import { getEmptyReport } from '../../../common/getEmptyReport';
import { parseCss } from '../../../common/parseCss';
import { handleBorderRadiuses } from '.';

describe('Module: handleBorderRadiuses', () => {
	const src = `
		.selector {
			border-radius: 1px;
		}

		.selector {
			border-top-left-radius: 2px;
			border-top-right-radius: 3px;
			border-bottom-left-radius: 4px;
			border-bottom-right-radius: 5px;
		}

		.selector {
			border-top-left-radius: 6px;
			border-top-right-radius: 7px;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 9px;
		}

		.selector {
			border-radius: 10px 11px;
		}

		.selector {
			border-radius: 12px 13px 14px;
		}

		.selector {
			border-radius: 15px 16px 17px 18px;
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = getEmptyReport();

		cssRoot.walkDecls((decl) => {
			handleBorderRadiuses(decl, report);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('borderRadiuses.total', () => {
		it('should be counted correctly', () => {
			expect(report.borderRadiuses.total).toBe(12);
		});
	});

	describe('borderRadiuses.unique', () => {
		it('should be counted correctly', () => {
			expect(report.borderRadiuses.unique).toBe(0);
		});
	});

	describe('borderRadiuses.usage', () => {
		it('should be counted correctly', () => {
			expect(report.borderRadiuses.usage).toStrictEqual({
				'1px': 1,
				'2px': 1,
				'3px': 1,
				'4px': 1,
				'5px': 1,
				'6px': 1,
				'7px': 1,
				'8px': 1,
				'9px': 1,
				'10px 11px': 1,
				'12px 13px 14px': 1,
				'15px 16px 17px 18px': 1,
			});
		});
	});
});
