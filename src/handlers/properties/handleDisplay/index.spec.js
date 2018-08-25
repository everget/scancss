import { getEmptyReport } from '../../../common/getEmptyReport';
import { parseCss } from '../../../common/parseCss';
import { handleDisplay } from '.';

describe('Module: handleDisplay', () => {
	const src = `
		/* <display-outside> */
		.selector {
			display: block;
		}

		.selector {
			display: inline;
		}

		.selector {
			display: run-in;
		}

		/* <display-inside> */
		.selector {
			display: flow;
		}

		.selector {
			display: flow-root;
		}

		.selector {
			display: table;
		}

		.selector {
			display: flex;
		}

		.selector {
			display: grid;
		}

		.selector {
			display: ruby;
		}

		.selector {
			display: subgrid;
		}

		/* <display-outside> plus <display-inside> */
		.selector {
			display: block flow;
		}

		.selector {
			display: inline table;
		}

		.selector {
			display: flex run-in;
		}

		/* <display-listitem> */
		.selector {
			display: list-item;
		}

		.selector {
			display: list-item block;
		}

		.selector {
			display: list-item inline;
		}

		.selector {
			display: list-item flow;
		}

		.selector {
			display: list-item flow-root;
		}

		.selector {
			display: list-item block flow;
		}

		.selector {
			display: list-item block flow-root;
		}

		.selector {
			display: flow list-item block;
		}

		/* <display-internal> */
		.selector {
			display: table-row-group;
		}

		.selector {
			display: table-header-group;
		}

		.selector {
			display: table-footer-group;
		}

		.selector {
			display: table-row;
		}

		.selector {
			display: table-cell;
		}

		.selector {
			display: table-column-group;
		}

		.selector {
			display: table-column;
		}

		.selector {
			display: table-caption;
		}

		.selector {
			display: ruby-base;
		}

		.selector {
			display: ruby-text;
		}

		.selector {
			display: ruby-base-container;
		}

		.selector {
			display: ruby-text-container;
		}

		/* <display-box> */
		.selector {
			display: contents;
		}

		.selector {
			display: none;
		}

		/* <display-legacy> */
		.selector {
			display: inline-block;
		}

		.selector {
			display: inline-table;
		}

		.selector {
			display: inline-flex;
		}

		.selector {
			display: inline-grid;
		}

		/ * Global * /
		.selector {
			display: inherit;
		}

		.selector {
			display: initial;
		}

		.selector {
			display: unset;
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = getEmptyReport();

		cssRoot.walkDecls((decl) => {
			handleDisplay(decl, report);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('displays.total', () => {
		it('should be counted correctly', () => {
			expect(report.displays.total).toBe(42);
		});
	});

	describe('displays.unique', () => {
		it('should be counted correctly', () => {
			expect(report.displays.unique).toBe(0);
		});
	});

	describe('displays.usage', () => {
		it('should be counted correctly', () => {
			expect(report.displays.usage).toStrictEqual({
				block: 1,
				inline: 1,
				'run-in': 1,

				flow: 1,
				'flow-root': 1,
				table: 1,
				flex: 1,
				grid: 1,
				ruby: 1,
				subgrid: 1,

				'block flow': 1,
				'inline table': 1,
				'flex run-in': 1,

				'list-item': 1,
				'list-item block': 1,
				'list-item inline': 1,
				'list-item flow': 1,
				'list-item flow-root': 1,
				'list-item block flow': 1,
				'list-item block flow-root': 1,
				'flow list-item block': 1,

				'table-row-group': 1,
				'table-header-group': 1,
				'table-footer-group': 1,
				'table-row': 1,
				'table-cell': 1,
				'table-column-group': 1,
				'table-column': 1,
				'table-caption': 1,
				'ruby-base': 1,
				'ruby-text': 1,
				'ruby-base-container': 1,
				'ruby-text-container': 1,

				contents: 1,
				none: 1,

				'inline-block': 1,
				'inline-table': 1,
				'inline-flex': 1,
				'inline-grid': 1,

				inherit: 1,
				initial: 1,
				unset: 1,
			});
		});
	});
});
