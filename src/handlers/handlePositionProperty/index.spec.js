import postcss from 'postcss';
import { default as safeParser } from 'postcss-safe-parser';

import { handlePositionProperty } from '.';

describe('Module: handlePositionProperty', () => {
	const src = `
		.selector {
			position: static;
		}

		.selector {
			position: relative;
		}

		.selector {
			position: absolute;
		}

		.selector {
			position: fixed;
		}

		.selector {
			position: sticky;
		}

		.selector {
			position: -moz-sticky;
		}

		.selector {
			position: inherit;
		}

		.selector {
			position: initial;
		}

		.selector {
			position: unset;
		}
	`;

	const cssRoot = postcss.parse(
		postcss().process(src, { parser: safeParser }).root
	);

	let report;

	beforeEach(() => {
		report = {
			positions: {
				total: 0,
				unique: 0,
				usage: {},
			},
		};

		cssRoot.walkDecls((decl) => {
			handlePositionProperty(decl, report);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('positions.total', () => {
		it('should be counted correctly', () => {
			expect(report.positions.total).toBe(9);
		});
	});

	describe('positions.unique', () => {
		it('should be counted correctly', () => {
			expect(report.positions.unique).toBe(0);
		});
	});

	describe('positions.usage', () => {
		it('should be counted correctly', () => {
			expect(report.positions.usage).toEqual({
				static: 1,
				relative: 1,
				absolute: 1,
				fixed: 1,
				sticky: 1,
				'-moz-sticky': 1,
				inherit: 1,
				initial: 1,
				unset: 1,
			});
		});
	});
});
