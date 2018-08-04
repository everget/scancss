import postcss from 'postcss';
import { default as safeParser } from 'postcss-safe-parser';

import { handleSelector } from '.';

describe('Module: handleSelector', () => {
	const options = {
		collectSpecificityGraphData: false,
		collectSelectorsUsage: true,
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

		p:first-line {}
		p::first-line {}

		*[rel=up] {}

		a[src] {}

		ul ol li .red {}

		li .red .level {}

		.foo {}

		.foo .bar .baz {}

		a:-webkit-any-link {}
		a:-moz-any-link {}

		a:not(:active):matches(:focus) {}

		h1:has(a:not(:has(:visited))) {}

		#bar {}

		ul #nav li .active a {}

		* body #home div #warning p .message {}
	`;

	const cssRoot = postcss.parse(
		postcss().process(src, { parser: safeParser }).root
	);

	let report;

	beforeEach(() => {
		report = {
			selectors: {
				total: 0,
				unique: 0,
				baseUsage: {},
				pseudoClassesUsage: {},
				pseudoElementsUsage: {},
				combinators: {
					total: 0,
					adjacentSibling: 0,
					child: 0,
					descendant: 0,
					generalSibling: 0,
				},
				complex: 0,
				maxPerRule: 0,
				averagePerRule: 0,
				totalByteLength: 0,
				longestByteLength: 0,
				longestByteLengthSelector: null,
				averageByteLength: 0,
				totalSpecificity: [0, 0, 0],
				averageSpecificity: [0, 0, 0],
				highestSpecificity: [0, 0, 0],
				highestSpecificitySelector: null,
				sizeRatio: 0,
				specificityGraphData: [],
				usage: {},
			},
			vendorPrefixes: {
				total: 0,
				unique: 0,
				unknown: {},
				usage: {},
			},
		};

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
			expect(report.selectors.total).toBe(22);
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
				attribute: 2,
				class: 9,
				id: 4,
				pseudoClass: 10,
				pseudoElement: 2,
				tag: 28,
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

	describe('selectors.totalByteLength', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.totalByteLength).toBe(270);
		});
	});

	describe('selectors.longestByteLength', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.longestByteLength).toBe(36);
		});
	});

	describe('selectors.longestByteLengthSelector', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.longestByteLengthSelector).toBe('* body #home div #warning p .message');
		});
	});

	describe('selectors.averageByteLength', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.averageByteLength).toBe(0);
		});
	});

	describe('selectors.totalSpecificity', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.totalSpecificity).toEqual([4, 19, 30]);
		});
	});

	describe('selectors.averageSpecificity', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.averageSpecificity).toEqual([0, 0, 0]);
		});
	});

	describe('selectors.highestSpecificity', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.highestSpecificity).toEqual([2, 1, 3]);
		});
	});

	describe('selectors.highestSpecificitySelector', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.highestSpecificitySelector).toBe('* body #home div #warning p .message');
		});
	});

	describe('selectors.sizeRatio', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.sizeRatio).toBe(0);
		});
	});

	describe('selectors.specificityGraphData', () => {
		it('should be counted correctly', () => {
			expect(report.selectors.specificityGraphData).toEqual([]);
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
			});
		});
	});

	describe('vendorPrefixes.total', () => {
		it('should be counted correctly', () => {
			expect(report.vendorPrefixes.total).toBe(2);
		});
	});

	describe('vendorPrefixes.usage', () => {
		it('should be counted correctly', () => {
			expect(report.vendorPrefixes.usage).toEqual({
				'-moz-': 1,
				'-webkit-': 1,
			});
		});
	});
});
