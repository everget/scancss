import postcss from 'postcss';
import { default as safeParser } from 'postcss-safe-parser';

import { handleVariables } from '.';

describe('Module: handleVariables', () => {
	let report;

	beforeEach(() => {
		report = {
			variables: {
				total: 0,
				unique: 0,
				usage: {},
				valuesMap: {},
			},
		};
	});

	afterEach(() => {
		report = null;
	});

	describe('Handling variables', () => {
		const src = `
			:root {
				--main-bg-color: brown;
				--main-color: #ff6f69;
				--main-font-size: 16px;
			}

			element {
				background-color: var(--main-bg-color);
			}

			:root {
				--font-size: 20px;
			}

			.test {
				font-size: var(--font-size);
			}

			.selector {
				color: white;
				background-color: var(--main-bg-color);
				margin: 10px;
				width: 75px;
			}

			#title {
				color: var(--main-color);
			}

			.selector {
				--test: 10px;
			}

			.selector {
				color: var(--my-var, red);
			}

			.selector {
				background-color: var(--my-var, var(--my-background, pink));
			}

			.selector {
				background-color: var(--my-var, --my-background, pink);
			}

			.alert {
				--alert-color: #ff6f69;
			}

			.alert p {
				color: var(--alert-color);
				border: 1px solid var(--alert-color);
			}

			@media all and (max-width: 600px) {
				:root {
					--main-font-size: 12px;
				}
			}

			.margin {
				--space: calc(20px * 2);
				font-size: var(--space);
			}

			:root {
				--color: blue;
				--COLOR: red;
			}

			:root {
				--bgcolour: #ffffd0;
				--bqindents: 40px;
				--warningtextsize: 125%;
			}

			table {
				background-color: var(--bgcolour);
			}

			blockquote {
				margin-left: var(--bqindents);
				margin-right: var(--bqindents);
			}

			p.warning {
				color: red;
				background-color: var(--bgcolour);
				font-size: var(--warningtextsize);
			}
		`;

		const cssRoot = postcss.parse(
			postcss().process(src, { parser: safeParser }).root
		);

		beforeEach(() => {
			cssRoot.walkDecls((decl) => {
				handleVariables(decl, report);
			});
		});

		describe('variables.total', () => {
			it('should be counted correctly', () => {
				expect(report.variables.total).toBe(17);
			});
		});

		describe('variables.unique', () => {
			it('should be counted correctly', () => {
				expect(report.variables.unique).toBe(0);
			});
		});

		describe('variables.usage', () => {
			it('should be counted correctly', () => {
				expect(report.variables.usage).toEqual({
					'--alert-color': 2,
					'--bgcolour': 2,
					'--bqindents': 2,
					'--font-size': 1,
					'--main-bg-color': 2,
					'--main-color': 1,
					'--my-background': 2,
					'--my-var': 3,
					'--space': 1,
					'--warningtextsize': 1,
				});
			});
		});

		describe('variables.valuesMap', () => {
			it('should be counted correctly', () => {
				expect(report.variables.valuesMap).toEqual({
					'--COLOR': 'red',
					'--alert-color': '#ff6f69',
					'--bgcolour': '#ffffd0',
					'--bqindents': '40px',
					'--color': 'blue',
					'--font-size': '20px',
					'--main-bg-color': 'brown',
					'--main-color': '#ff6f69',
					'--main-font-size': '12px',
					'--space': 'calc(20px * 2)',
					'--test': '10px',
					'--warningtextsize': '125%',
				});
			});
		});
	});

	describe('Handling identifiers with variable-like parts', () => {
		const srcWithVariableLikeWords = `
			.tv-transition--fade-in {
				animation: tv-transition--fade-in .35s ease forwards;
			}

			.tv-transition--fade-out {
				animation: tv-transition--fade-out .35s ease forwards;
			}

			.tv-transition--slide-out {
				animation: tv-transition--slide-out .35s ease forwards;
			}
		`;

		const cssRoot = postcss.parse(
			postcss().process(srcWithVariableLikeWords, { parser: safeParser }).root
		);

		beforeEach(() => {
			cssRoot.walkDecls((decl) => {
				handleVariables(decl, report);
			});
		});

		describe('variables.total', () => {
			it('should be counted correctly', () => {
				expect(report.variables.total).toBe(0);
			});
		});

		describe('variables.usage', () => {
			it('should be counted correctly', () => {
				expect(report.variables.usage).toEqual({});
			});
		});

		describe('variables.valuesMap', () => {
			it('should be counted correctly', () => {
				expect(report.variables.valuesMap).toEqual({});
			});
		});
	});
});
