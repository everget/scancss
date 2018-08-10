import { parseCss } from '../../converters/parseCss';
import { handleLetterSpacingProperty } from '.';

describe('Module: handleLetterSpacingProperty', () => {
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
		report = {
			letterSpacings: {
				total: 0,
				unique: 0,
				usage: {},
			},
		};

		cssRoot.walkDecls((decl) => {
			handleLetterSpacingProperty(decl, report);
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
			expect(report.letterSpacings.usage).toEqual({
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
