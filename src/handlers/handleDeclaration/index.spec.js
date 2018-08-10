import postcss from 'postcss';
import { default as safeParser } from 'postcss-safe-parser';

import { handleDeclaration } from '.';

describe('Module: handleDeclaration', () => {
	const options = {
		collectEngineTriggerProperties: true,
		collectColorsData: false,
		collectBackgroundColorsData: false,
		collectAllColorsData: false,
		collectFontsData: false,
		collectFunctionsData: false,
		collectVariablesData: false,
		collectUnitsData: false,
		collectTransitionsAndAnimationsData: false,
		collectPerformanceHacksData: false,
	};

	const src = `
		.selector: {
			content: '';
			display: block !important;
			position: static;
			z-index: -1;
			float: left;
			border-radius: 1px;
			letter-spacing: normal;
			all: initial;
		}

		.selector: {
			content: '';
			display: inline-block !important;
			position: relative;
			float: left;
			border-radius: 1px 2px;
			letter-spacing: .3px;
			all: initial;
		}

		.selector: {
			content: '';
			display: flex !important;
			position: absolute;
			float: right;
			border-radius: 1px 2px 3px;
			letter-spacing: 0.3em;
			all: initial;
		}

		.selector: {
			content: '';
			display: inline-table !important;
			position: fixed;
			float: right;
			border-radius: 1px 2px 3px 4px;
			letter-spacing: -1px;
			all: initial;
		}

		.selector: {
			content: '';
			display: grid !important;
			position: sticky;
			float: none;
			border-top-left-radius: 1px;
			border-top-right-radius: 2px;
			border-bottom-left-radius: 3px;
			border-bottom-right-radius: 4px;
			letter-spacing: .2rem;
			all: initial;
		}

		.selector: {
			content: '';
			display: contents !important;
			position: unset;
			float: inherit;
			border-top-left-radius: 5px;
			border-top-right-radius: 6px;
			border-bottom-left-radius: 7px;
			border-bottom-right-radius: 8px;
			letter-spacing: inherit;
			all: initial;
		}

		.selector {
			-moz-transition: background-color 5s ease-in-out 2s;
			-ms-transition: background-color 5s ease-in-out 2s;
			-o-transition: background-color 5s ease-in-out 2s;
			-webkit-transition: background-color 5s ease-in-out 2s;
			transition: background-color 5s ease-in-out 2s;
		}
	`;

	const cssRoot = postcss.parse(
		postcss().process(src, { parser: safeParser }).root
	);

	let report;

	beforeEach(() => {
		report = {
			declarations: {
				total: 0,
				unique: 0,
				important: 0,
				averagePerRule: 0,
				inAtRules: {},
				list: [],
			},
			properties: {
				total: 0,
				unique: 0,
				shorthands: 0,
				prefixed: 0,
				resetsViaAll: 0,
				negativeMargins: 0,
				anonymousReplacedElements: 0,
				performanceHacks: {},
				explicitDefaultingKeywords: {
					total: 0,
					unique: 0,
					usage: {},
				},
				engineTriggers: {
					composite: {
						blink: 0,
						edgehtml: 0,
						gecko: 0,
						webkit: 0,
					},
					layout: {
						blink: 0,
						edgehtml: 0,
						gecko: 0,
						webkit: 0,
					},
					paint: {
						blink: 0,
						edgehtml: 0,
						gecko: 0,
						webkit: 0,
					},
				},
				usage: {},
			},
			displays: {
				total: 0,
				unique: 0,
				usage: {},
			},
			positions: {
				total: 0,
				unique: 0,
				usage: {},
			},
			zIndices: {
				total: 0,
				unique: 0,
				invalid: {},
				usage: {},
			},
			floats: {
				total: 0,
				unique: 0,
				usage: {},
			},
			borderRadiuses: {
				total: 0,
				unique: 0,
				usage: {},
			},
			letterSpacings: {
				total: 0,
				unique: 0,
				usage: {},
			},
			vendorPrefixes: {
				total: 0,
				unique: 0,
				unknown: {},
				usage: {},
			},
		};

		cssRoot.walkDecls((decl) => {
			handleDeclaration(decl, report, options);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('Handling declarations', () => {
		describe('declarations.total', () => {
			it('should be counted correctly', () => {
				expect(report.declarations.total).toBe(54);
			});
		});

		describe('declarations.unique', () => {
			it('should be counted correctly', () => {
				expect(report.declarations.unique).toBe(0);
			});
		});

		describe('declarations.important', () => {
			it('should be counted correctly', () => {
				expect(report.declarations.important).toBe(6);
			});
		});
	});

	describe('Handling properties', () => {
		describe('properties.total', () => {
			it('should be counted correctly', () => {
				expect(report.properties.total).toBe(54);
			});
		});

		describe('properties.unique', () => {
			it('should be counted correctly', () => {
				expect(report.properties.unique).toBe(0);
			});
		});

		describe('properties.shorthands', () => {
			it('should be counted correctly', () => {
				expect(report.properties.shorthands).toBe(9);
			});
		});

		describe('properties.prefixed', () => {
			it('should be counted correctly', () => {
				expect(report.properties.prefixed).toBe(4);
			});
		});

		describe('properties.resetsViaAll', () => {
			it('should be counted correctly', () => {
				expect(report.properties.resetsViaAll).toBe(6);
			});
		});

		describe('properties.engineTriggers', () => {
			it('should be counted correctly', () => {
				expect(report.properties.engineTriggers).toEqual({
					composite: {
						blink: 33,
						edgehtml: 33,
						gecko: 33,
						webkit: 33,
					},
					layout: {
						blink: 24,
						edgehtml: 32,
						gecko: 24,
						webkit: 33,
					},
					paint: {
						blink: 33,
						edgehtml: 33,
						gecko: 33,
						webkit: 33,
					},
				});
			});
		});

		describe('properties.anonymousReplacedElements', () => {
			it('should be counted correctly', () => {
				expect(report.properties.anonymousReplacedElements).toBe(6);
			});
		});

		describe('properties.usage', () => {
			it('should be counted correctly', () => {
				expect(report.properties.usage).toEqual({
					content: 6,
					display: 6,
					position: 6,
					'z-index': 1,
					float: 6,
					'border-radius': 4,
					'border-top-left-radius': 2,
					'border-top-right-radius': 2,
					'border-bottom-left-radius': 2,
					'border-bottom-right-radius': 2,
					'letter-spacing': 6,
					all: 6,
					'-moz-transition': 1,
					'-ms-transition': 1,
					'-o-transition': 1,
					'-webkit-transition': 1,
					transition: 1,
				});
			});
		});

		describe('properties.explicitDefaultingKeywords.total', () => {
			it('should be counted correctly', () => {
				expect(report.properties.explicitDefaultingKeywords.total).toBe(9);
			});
		});

		describe('properties.explicitDefaultingKeywords.unique', () => {
			it('should be counted correctly', () => {
				expect(report.properties.explicitDefaultingKeywords.unique).toBe(0);
			});
		});

		describe('properties.explicitDefaultingKeywords.usage', () => {
			it('should be counted correctly', () => {
				expect(report.properties.explicitDefaultingKeywords.usage).toEqual({
					inherit: 2,
					initial: 6,
					unset: 1,
				});
			});
		});
	});

	describe('Handling displays', () => {
		describe('displays.total', () => {
			it('should be counted correctly', () => {
				expect(report.displays.total).toBe(6);
			});
		});

		describe('displays.unique', () => {
			it('should be counted correctly', () => {
				expect(report.displays.unique).toBe(0);
			});
		});

		describe('displays.usage', () => {
			it('should be counted correctly', () => {
				expect(report.displays.usage).toEqual({
					block: 1,
					'inline-block': 1,
					'inline-table': 1,
					flex: 1,
					grid: 1,
					contents: 1,
				});
			});
		});
	});

	describe('Handling positions', () => {
		describe('positions.total', () => {
			it('should be counted correctly', () => {
				expect(report.positions.total).toBe(6);
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
					unset: 1,
				});
			});
		});
	});

	describe('Handling z-indices', () => {
		describe('zIndices.total', () => {
			it('should be counted correctly', () => {
				expect(report.zIndices.total).toBe(1);
			});
		});

		describe('zIndices.unique', () => {
			it('should be counted correctly', () => {
				expect(report.zIndices.unique).toBe(0);
			});
		});

		describe('zIndices.invalid', () => {
			it('should be counted correctly', () => {
				expect(report.zIndices.invalid).toEqual({});
			});
		});

		describe('zIndices.usage', () => {
			it('should be counted correctly', () => {
				/* eslint-disable quote-props */
				expect(report.zIndices.usage).toEqual({
					'-1': 1,
				});
				/* eslint-enable quote-props */
			});
		});
	});

	describe('Handling floats', () => {
		describe('floats.total', () => {
			it('should be counted correctly', () => {
				expect(report.floats.total).toBe(6);
			});
		});

		describe('floats.unique', () => {
			it('should be counted correctly', () => {
				expect(report.floats.unique).toBe(0);
			});
		});

		describe('floats.usage', () => {
			it('should be counted correctly', () => {
				expect(report.floats.usage).toEqual({
					left: 2,
					right: 2,
					none: 1,
					inherit: 1,
				});
			});
		});
	});

	describe('Handling border-radiuses', () => {
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
				expect(report.borderRadiuses.usage).toEqual({
					'1px': 2,
					'2px': 1,
					'3px': 1,
					'4px': 1,
					'5px': 1,
					'6px': 1,
					'7px': 1,
					'8px': 1,
					'1px 2px': 1,
					'1px 2px 3px': 1,
					'1px 2px 3px 4px': 1,
				});
			});
		});
	});

	describe('Handling letter-spacings', () => {
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

	describe('Handling vendor prefixes', () => {
		describe('vendorPrefixes.total', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes.total).toBe(4);
			});
		});

		describe('vendorPrefixes.unique', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes.unique).toBe(0);
			});
		});

		describe('vendorPrefixes.usage', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes.usage).toEqual({
					'-moz-': 1,
					'-ms-': 1,
					'-o-': 1,
					'-webkit-': 1,
				});
			});
		});
	});
});
