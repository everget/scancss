import { parseCss } from '../../converters/parseCss';
import { handleRule } from '.';

describe('Module: handleRule', () => {
	const options = {
		collectSelectorsData: false,
	};

	const src = `
		.selector {}

		.selector-1,
		.selector-2,
		.selector-3 {
			content: '';
			display: block !important;
			position: static;
			z-index: -1;
			float: left;
			border-radius: 1px;
			letter-spacing: normal;
			all: initial;
		}

		.selector {
			content: '';
			display: inline-block !important;
			position: relative;
			z-index: 1;
			float: left;
			border-radius: 1px 2px;
			letter-spacing: .3px;
			all: initial;
		}

		.selector {
			content: '';
			display: flex !important;
			position: absolute;
			z-index: 100;
			float: right;
			border-radius: 1px 2px 3px;
			letter-spacing: 0.3em;
			all: initial;
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = {
			rules: {
				total: 0,
				empty: 0,
			},
		};

		cssRoot.walkRules((rule) => {
			handleRule(rule, report, options);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('rules.total', () => {
		it('should be counted correctly', () => {
			expect(report.rules.total).toBe(4);
		});
	});

	describe('rules.empty', () => {
		it('should be counted correctly', () => {
			expect(report.rules.empty).toBe(1);
		});
	});
});
