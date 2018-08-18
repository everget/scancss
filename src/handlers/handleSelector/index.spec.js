import { getEmptyReport } from '../../common/getEmptyReport';
import { parseCss } from '../../common/parseCss';
import { handleSelector } from '.';

describe('Module: handleSelector', () => {
	const options = {
		specificityGraph: false,
		selectorsUsage: true,
		attributesUsage: true,
		selectorComplexityThreshold: 4,
	};

	const src = `
		* {}

		body {}

		li {}

		ul li {}

		li + li {}

		li > li {}

		li ~ li {}

		*[rel=up] {}

		a[src] {}

		abbr[title],
		abbr[data-original-title] {}

		[bp~='vertical-center'] {}

		[bp~='grid'][bp*='@'] {}

		button::-moz-focus-inner,
		[type="button"]::-moz-focus-inner,
		[type="reset"]::-moz-focus-inner,
		[type="submit"]::-moz-focus-inner {}

		ul ol li .red {}

		li .red .level {}

		.foo {}

		.foo .bar .baz {}

		p:first-line {}
		p::first-line {}

		a:-webkit-any-link {}
		a:-moz-any-link {}

		a:not(:active):matches(:focus) {}

		h1:has(a:not(:has(:visited))) {}

		#bar {}

		ul #nav li .active a {}

		* body #home div #warning p .message {}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = getEmptyReport();

		cssRoot.walkRules((rule) => {
			rule.selectors.forEach((selector) => {
				handleSelector(selector, report, options);
			});
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('selectors.total', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.total).toBe(30);
		});
	});

	describe('selectors.unique', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.unique).toBe(0);
		});
	});

	describe('selectors.baseUsage', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.baseUsage).toEqual({
				attribute: 10,
				class: 9,
				id: 4,
				pseudoClass: 10,
				pseudoElement: 6,
				tag: 31,
				universal: 3,
			});
		});
	});

	describe('selectors.pseudoClassesUsage', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.pseudoClassesUsage).toEqual({
				':active': 1,
				':focus': 1,
				':has': 2,
				':matches': 1,
				':not': 2,
				':visited': 1,
				':-webkit-any-link': 1,
				':-moz-any-link': 1,
			});
		});
	});

	describe('selectors.pseudoElementsUsage', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.pseudoElementsUsage).toEqual({
				'::first-line': 2,
				'::-moz-focus-inner': 4,
			});
		});
	});

	describe('selectors.combinators', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.combinators).toEqual({
				total: 21,
				adjacentSibling: 1,
				child: 1,
				descendant: 18,
				generalSibling: 1,
			});
		});
	});

	describe('selectors.complex', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.complex).toBe(4);
		});
	});

	describe('selectors.maxPerRule', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.maxPerRule).toBe(0);
		});
	});

	describe('selectors.averagePerRule', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.averagePerRule).toBe(0);
		});
	});

	describe('selectors.sizeRatio', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.sizeRatio).toBe(0);
		});
	});

	describe('selectors.usage', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.usage).toEqual({
				'#bar': 1,
				'*': 1,
				'* body #home div #warning p .message': 1,
				'*[rel=up]': 1,
				'.foo': 1,
				'.foo .bar .baz': 1,
				'a:not(:active):matches(:focus)': 1,
				'a[src]': 1,
				'a:-webkit-any-link': 1,
				'a:-moz-any-link': 1,
				body: 1,
				'h1:has(a:not(:has(:visited)))': 1,
				li: 1,
				'li + li': 1,
				'li .red .level': 1,
				'li > li': 1,
				'li ~ li': 1,
				'p::first-line': 1,
				'p:first-line': 1,
				'ul #nav li .active a': 1,
				'ul li': 1,
				'ul ol li .red': 1,
				'abbr[title]': 1,
				'abbr[data-original-title]': 1,
				'[bp~=\'vertical-center\']': 1,
				'[bp~=\'grid\'][bp*=\'@\']': 1,
				'button::-moz-focus-inner': 1,
				'[type="button"]::-moz-focus-inner': 1,
				'[type="reset"]::-moz-focus-inner': 1,
				'[type="submit"]::-moz-focus-inner': 1,
			});
		});
	});

	describe('Handling lengths', () => {
		describe('selectors.length.total', () => {
			it('should be counted correctly', () => {
				expect(report.selectors.length.total).toBe(472);
			});
		});

		describe('selectors.length.longest', () => {
			it('should be counted correctly', () => {
				expect(report.selectors.length.longest).toBe(36);
			});
		});

		describe('selectors.length.longestSelector', () => {
			it('should be counted correctly', () => {
				expect(report.selectors.length.longestSelector).toBe('* body #home div #warning p .message');
			});
		});

		describe('selectors.length.average', () => {
			it('should be counted correctly', () => {
				expect(report.selectors.length.average).toBe(0);
			});
		});
	});

	describe('Handling specificity', () => {
		describe('selectors.specificity.total', () => {
			it('should be counted correctly', () => {
				expect(report.selectors.specificity.total).toEqual([4, 27, 37]);
			});
		});

		describe('selectors.specificity.average', () => {
			it('should be counted correctly', () => {
				expect(report.selectors.specificity.average).toEqual([0, 0, 0]);
			});
		});

		describe('selectors.specificity.highest', () => {
			it('should be counted correctly', () => {
				expect(report.selectors.specificity.highest).toEqual([2, 1, 3]);
			});
		});

		describe('selectors.specificity.highestSelector', () => {
			it('should be counted correctly', () => {
				expect(report.selectors.specificity.highestSelector).toBe('* body #home div #warning p .message');
			});
		});

		describe('selectors.specificity.graphData', () => {
			it('should be counted correctly', () => {
				expect(report.selectors.specificity.graphData).toEqual([]);
			});
		});
	});

	describe('Handling vendor prefixes', () => {
		describe('vendorPrefixes.total', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes.total).toBe(6);
			});
		});

		describe('vendorPrefixes.unique', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes.unique).toBe(0);
			});
		});

		describe('vendorPrefixes.unknown.total', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes.unknown.total).toBe(0);
			});
		});

		describe('vendorPrefixes.unknown.unique', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes.unknown.unique).toBe(0);
			});
		});

		describe('vendorPrefixes.unknown.usage', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes.unknown.usage).toEqual({});
			});
		});

		describe('vendorPrefixes.usage', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes.usage).toEqual({
					'-moz-': 5,
					'-webkit-': 1,
				});
			});
		});
	});
});
