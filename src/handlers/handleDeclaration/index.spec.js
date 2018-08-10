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
			display: flex !important;
			position: sticky;
			z-index: -1;
			float: none;
			border-radius: 1px 2px 3px 4px;
			letter-spacing: 0.3em;
			all: initial;
		}

		.selector: {
			content: '';
			all: initial;
		}

		.selector: {
			content: '';
			all: initial;
		}

		.selector: {
			content: '';
			all: initial;
		}

		.selector: {
			content: '';
			all: initial;
		}

		.selector: {
			content: '';
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
				expect(report.declarations.total).toBe(23);
			});
		});

		describe('declarations.unique', () => {
			it('should be counted correctly', () => {
				expect(report.declarations.unique).toBe(0);
			});
		});

		describe('declarations.important', () => {
			it('should be counted correctly', () => {
				expect(report.declarations.important).toBe(1);
			});
		});
	});

	describe('Handling properties', () => {
		describe('properties.total', () => {
			it('should be counted correctly', () => {
				expect(report.properties.total).toBe(23);
			});
		});

		describe('properties.unique', () => {
			it('should be counted correctly', () => {
				expect(report.properties.unique).toBe(0);
			});
		});

		describe('properties.shorthands', () => {
			it('should be counted correctly', () => {
				expect(report.properties.shorthands).toBe(6);
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
						blink: 5,
						edgehtml: 5,
						gecko: 5,
						webkit: 5,
					},
					layout: {
						blink: 4,
						edgehtml: 4,
						gecko: 4,
						webkit: 5,
					},
					paint: {
						blink: 5,
						edgehtml: 5,
						gecko: 5,
						webkit: 5,
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
					display: 1,
					position: 1,
					'z-index': 1,
					float: 1,
					'border-radius': 1,
					'letter-spacing': 1,
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
				expect(report.properties.explicitDefaultingKeywords.total).toBe(6);
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
					initial: 6,
				});
			});
		});
	});

	describe('Handling displays', () => {
		describe('displays.total', () => {
			it('should be counted correctly', () => {
				expect(report.displays.total).toBe(1);
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
					flex: 1,
				});
			});
		});
	});

	describe('Handling positions', () => {
		describe('positions.total', () => {
			it('should be counted correctly', () => {
				expect(report.positions.total).toBe(1);
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
					sticky: 1,
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
				expect(report.floats.total).toBe(1);
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
					none: 1,
				});
			});
		});
	});

	describe('Handling border-radiuses', () => {
		describe('borderRadiuses.total', () => {
			it('should be counted correctly', () => {
				expect(report.borderRadiuses.total).toBe(1);
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
					'1px 2px 3px 4px': 1,
				});
			});
		});
	});

	describe('Handling letter-spacings', () => {
		describe('letterSpacings.total', () => {
			it('should be counted correctly', () => {
				expect(report.letterSpacings.total).toBe(1);
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
					'0.3em': 1,
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
