import { getEmptyReport } from '../../common/getEmptyReport';
import { parseCss } from '../../common/parseCss';
import { handleDeclaration } from '.';

describe('Module: handleDeclaration', () => {
	const options = {
		properties: true,
		engineTriggerProperties: true,
		displays: true,
		positions: true,
		zIndices: true,
		floats: true,
		borderRadiuses: true,
		letterSpacings: true,
		colors: false,
		backgroundColors: false,
		allColors: false,
		fonts: false,
		functions: false,
		variables: false,
		units: false,
		transitionsAndAnimations: false,
		performanceHacks: false,
	};

	const src = `
		.selector {
			content: '';
			display: flex !important;
			position: sticky;
			z-index: -1;
			float: none;
			border-radius: 1px 2px 3px 4px;
			letter-spacing: 0.3em;
			all: initial;
		}

		.selector {
			content: '';
			all: inherit;
		}

		.selector {
			content: '';
			all: unset;
		}

		.selector {
			content: '';
			all: revert;
		}

		.selector {
			-moz-transition: background-color 5s ease-in-out 2s;
			-ms-transition: background-color 5s ease-in-out 2s;
			-o-transition: background-color 5s ease-in-out 2s;
			-webkit-transition: background-color 5s ease-in-out 2s;
			transition: background-color 5s ease-in-out 2s;
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = getEmptyReport();

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
				expect(report.declarations.total).toBe(19);
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

		describe('declarations.length.total', () => {
			it('should be counted correctly', () => {
				expect(report.declarations.length.total).toBe(452);
			});
		});

		describe('declarations.length.average', () => {
			it('should be counted correctly', () => {
				expect(report.declarations.length.average).toBe(0);
			});
		});

		describe('declarations.length.longest', () => {
			it('should be counted correctly', () => {
				expect(report.declarations.length.longest).toBe(54);
			});
		});

		describe('declarations.length.longestDeclaration', () => {
			it('should be counted correctly', () => {
				expect(report.declarations.length.longestDeclaration).toBe('-webkit-transition:background-color 5s ease-in-out 2s');
			});
		});
	});

	describe('Handling properties', () => {
		describe('properties.total', () => {
			it('should be counted correctly', () => {
				expect(report.properties.total).toBe(19);
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
				expect(report.properties.resetsViaAll).toBe(4);
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
				expect(report.properties.anonymousReplacedElements).toBe(4);
			});
		});

		describe('properties.usage', () => {
			it('should be counted correctly', () => {
				expect(report.properties.usage).toEqual({
					content: 4,
					display: 1,
					position: 1,
					'z-index': 1,
					float: 1,
					'border-radius': 1,
					'letter-spacing': 1,
					all: 4,
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
				expect(report.properties.explicitDefaultingKeywords.total).toBe(4);
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
					inherit: 1,
					initial: 1,
					revert: 1,
					unset: 1,
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
					'-moz-': 1,
					'-ms-': 1,
					'-o-': 1,
					'-webkit-': 1,
				});
			});
		});
	});
});
