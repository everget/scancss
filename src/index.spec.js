import { getEmptyReport } from './common/getEmptyReport';
import scancss from '.';

describe('Module: scancss', () => {
	const src = `
		/* Lorem ipsum dolor sit amet */

		@font-face {
			font-family: 'Open Sans';
			src: url('/fonts/OpenSans-Regular-webfont.woff2') format('woff2'),
				url('/fonts/OpenSans-Regular-webfont.woff') format('woff');
		}

		.selector {
			display: inline-block;
			position: fixed;
			z-index: '';
			margin: 0 auto;
			border: 1px solid #123123;
			width: 40px;
			height: 40px;
			font: message-box;
			background-color: transparent;
			animation: ease 1s fade-in;
			color: #fff
		}

		.selector {}

		::-moz-placeholder {
			color: red;
		}

		[tabindex="-1"]:focus {}

		abbr[title],
		abbr[data-original-title] {}

		@-webkit-keyframes fade {
			from,
			10% {
				opacity: 1;
			}

			88%,
			to {
				opacity: 0
			}
		}

		@keyframes fade {
			from,
			10% {
				opacity: 1;
			}

			88%,
			to {
				opacity: 0
			}
		}

		@media screen and (max-width: 480px) {
			.selector {
				width: 20px;
				height: 20px;
				background-color: #456456;
				color: #000;
				animation: infinite ease 1s fade
			}
		}

		@foobar {}
	`;

	describe('Throwing errors', () => {
		it('should throw error if 1st argument does not have `string` type', () => {
			expect(() => scancss(NaN)).toThrowError('`scancss` expects a string');
		});
	});

	describe('Report', () => {
		let report;

		const options = {
			specificityGraph: true,
			uniqueDeclarationsList: true,
		};

		beforeEach(() => {
			report = scancss(src, options);
		});

		afterEach(() => {
			report = null;
		});

		describe('.styleSheetSize', () => {
			it('should be counted correctly', () => {
				expect(report.styleSheetSize).toStrictEqual({
					source: 1029,
					gzipSource: 499,
				});
			});
		});

		describe('.comments', () => {
			it('should be counted correctly', () => {
				expect(report.comments).toStrictEqual({
					total: 1,
					length: {
						total: 32,
						longest: 32,
						shortest: 32,
						average: 32,
					},
					sizeRatio: 0.031098153547133137,
					sizeRatioPercent: '3.11%',
				});
			});
		});

		describe('.atRules', () => {
			it('should be counted correctly', () => {
				expect(report.atRules).toStrictEqual({
					total: 5,
					empty: 1,
					prefixed: 1,
					unknown: {
						total: 1,
						unique: 1,
						usage: {
							foobar: 1,
						},
					},
					usage: {
						'-webkit-keyframes': 1,
						'font-face': 1,
						foobar: 1,
						keyframes: 1,
						media: 1,
					},
				});
			});
		});

		describe('.imports', () => {
			it('should be counted correctly', () => {
				expect(report.imports).toStrictEqual({
					total: 0,
					unique: 0,
					usage: {},
					urls: {},
				});
			});
		});

		describe('.mediaQueries', () => {
			it('should be counted correctly', () => {
				expect(report.mediaQueries).toStrictEqual({
					total: 1,
					unique: 1,
					onlyKeyword: 0,
					types: {
						total: 1,
						unique: 1,
						usage: {
							screen: 1,
						},
					},
					features: {
						total: 1,
						unique: 1,
						prefixed: 0,
						usage: {
							'max-width': 1,
						},
					},
					usage: {
						'screen and (max-width:480px)': 1,
					},
				});
			});
		});

		describe('.keyframes', () => {
			it('should be counted correctly', () => {
				expect(report.keyframes).toStrictEqual({
					stepsChains: {
						'0% -> 10% -> 88% -> 100%': 2,
					},
					longestStepsChain: '0% -> 10% -> 88% -> 100%',
					longestStepsChainLength: 4,
					longestStepsChainAnimation: 'fade',
					shortestStepsChain: '0% -> 10% -> 88% -> 100%',
					shortestStepsChainLength: 4,
					shortestStepsChainAnimation: 'fade',
					animatableProperties: [
						'opacity',
					],
					definedAnimations: [
						'fade',
					],
				});
			});
		});

		describe('.rules', () => {
			it('should be counted correctly', () => {
				expect(report.rules).toStrictEqual({
					total: 10,
					empty: 3,
					withoutTrailingSemicolon: 4,
				});
			});
		});

		describe('.selectors', () => {
			it('should be counted correctly', () => {
				expect(report.selectors).toStrictEqual({
					total: 7,
					unique: 5,
					baseUsage: {
						attribute: 3,
						class: 3,
						id: 0,
						pseudoClass: 1,
						pseudoElement: 1,
						tag: 2,
						universal: 0,
					},
					pseudoClassesUsage: {
						':focus': 1,
					},
					pseudoElementsUsage: {
						'::-moz-placeholder': 1,
					},
					attributesUsage: {
						'[tabindex="-1"]': 1,
						'[title]': 1,
						'[data-original-title]': 1,
					},
					combinators: {
						total: 0,
						adjacentSibling: 0,
						child: 0,
						descendant: 0,
						generalSibling: 0,
					},
					complex: 0,
					maxPerRule: 2,
					maxPerRuleList: [
						'abbr[title]',
						'abbr[data-original-title]',
					],
					averagePerRule: 0.7,
					length: {
						total: 102,
						longest: 25,
						longestSelector: 'abbr[data-original-title]',
						average: 14.57,
					},
					specificity: {
						total: [0, 7, 3],
						highest: [0, 2, 0],
						highestSelector: '[tabindex="-1"]:focus',
						highest10: [
							{
								selector: '[tabindex=\"-1\"]:focus',
								specificity: [0, 2, 0],
							},
							{
								selector: 'abbr[title]',
								specificity: [0, 1, 1],
							},
							{
								selector: 'abbr[data-original-title]',
								specificity: [0, 1, 1],
							},
							{
								selector: '.selector',
								specificity: [0, 1, 0],
							},
							{
								selector: '.selector',
								specificity: [0, 1, 0],
							},
							{
								selector: '.selector',
								specificity: [0, 1, 0],
							},
							{
								selector: '::-moz-placeholder',
								specificity: [0, 0, 1],
							},
						],
						average: [0, 1, 0.43],
						graphData: [
							[0, 1, 0],
							[0, 1, 0],
							[0, 0, 1],
							[0, 2, 0],
							[0, 1, 1],
							[0, 1, 1],
							[0, 1, 0],
						],
					},
					sizeRatio: 0.09912536443148688,
					sizeRatioPercent: '9.91%',
					usage: {
						'.selector': 3,
						'::-moz-placeholder': 1,
						'[tabindex="-1"]:focus': 1,
						'abbr[title]': 1,
						'abbr[data-original-title]': 1,
					},
				});
			});
		});

		describe('.declarations', () => {
			it('should be counted correctly', () => {
				expect(report.declarations).toStrictEqual({
					total: 21,
					unique: 19,
					uniqueRatio: 0.9047619047619048,
					important: 0,
					averagePerRule: 2.1,
					length: {
						total: 333,
						longest: 32,
						longestDeclaration: 'animation:infinite ease 1s fade',
						average: 15.86,
					},
					sizeRatio: 0.3236151603498542,
					sizeRatioPercent: '32.36%',
					inAtRules: {
						'-webkit-keyframes': 2,
						keyframes: 2,
						media: 5,
					},
					list: [
						'display:inline-block',
						'position:fixed',
						'z-index:\'\'',
						'margin:0 auto',
						'border:1px solid #123123',
						'width:40px',
						'height:40px',
						'font:message-box',
						'background-color:transparent',
						'animation:ease 1s fade-in',
						'color:#fff',
						'color:red',
						'opacity:1',
						'opacity:0',
						'width:20px',
						'height:20px',
						'background-color:#456456',
						'color:#000',
						'animation:infinite ease 1s fade',
					],
				});
			});
		});

		describe('.properties', () => {
			it('should be counted correctly', () => {
				expect(report.properties).toStrictEqual({
					total: 21,
					unique: 12,
					shorthands: 5,
					prefixed: 0,
					unitless: 14,
					resetsViaAll: 0,
					negativeMargins: 0,
					anonymousReplacedElements: 0,
					performanceHacks: {},
					autoKeyword: 1,
					inheritKeyword: 0,
					initialKeyword: 0,
					revertKeyword: 0,
					unsetKeyword: 0,
					engineTriggers: {
						composite: {
							blink: 16,
							edgehtml: 16,
							gecko: 16,
							webkit: 16,
						},
						layout: {
							blink: 6,
							edgehtml: 10,
							gecko: 6,
							webkit: 16,
						},
						paint: {
							blink: 16,
							edgehtml: 16,
							gecko: 12,
							webkit: 16,
						},
					},
					usage: {
						animation: 2,
						'background-color': 2,
						margin: 1,
						border: 1,
						color: 3,
						display: 1,
						font: 1,
						height: 2,
						opacity: 4,
						position: 1,
						width: 2,
						'z-index': 1,
					},
				});
			});
		});

		describe('.displays', () => {
			it('should be counted correctly', () => {
				expect(report.displays).toStrictEqual({
					total: 1,
					unique: 1,
					usage: {
						'inline-block': 1,
					},
				});
			});
		});

		describe('.positions', () => {
			it('should be counted correctly', () => {
				expect(report.positions).toStrictEqual({
					total: 1,
					unique: 1,
					usage: {
						fixed: 1,
					},
				});
			});
		});

		describe('.zIndices', () => {
			it('should be counted correctly', () => {
				expect(report.zIndices).toStrictEqual({
					total: 1,
					unique: 1,
					invalid: {
						'\'\'': 1,
					},
					usage: {
						'\'\'': 1,
					},
				});
			});
		});

		describe('.floats', () => {
			it('should be counted correctly', () => {
				expect(report.floats).toStrictEqual({
					total: 0,
					unique: 0,
					usage: {},
				});
			});
		});

		describe('.borderRadiuses', () => {
			it('should be counted correctly', () => {
				expect(report.borderRadiuses).toStrictEqual({
					total: 0,
					unique: 0,
					usage: {},
				});
			});
		});

		describe('.widths', () => {
			it('should be counted correctly', () => {
				expect(report.widths).toStrictEqual({
					total: 2,
					unique: 2,
					usage: {
						'40px': 1,
						'20px': 1,
					},
				});
			});
		});

		describe('.heights', () => {
			it('should be counted correctly', () => {
				expect(report.heights).toStrictEqual({
					total: 2,
					unique: 2,
					usage: {
						'40px': 1,
						'20px': 1,
					},
				});
			});
		});

		describe('.letterSpacings', () => {
			it('should be counted correctly', () => {
				expect(report.letterSpacings).toStrictEqual({
					total: 0,
					unique: 0,
					usage: {},
				});
			});
		});

		describe('.fontSizes', () => {
			it('should be counted correctly', () => {
				expect(report.fontSizes).toStrictEqual({
					total: 0,
					unique: 0,
					keywords: {
						total: 0,
						unique: 0,
						usage: {},
					},
					usage: {},
				});
			});
		});

		describe('.lineHeights', () => {
			it('should be counted correctly', () => {
				expect(report.lineHeights).toStrictEqual({
					total: 0,
					unique: 0,
					hardCoded: 0,
					usage: {},
				});
			});
		});

		describe('.fontFamilies', () => {
			it('should be counted correctly', () => {
				expect(report.fontFamilies).toStrictEqual({
					total: 0,
					unique: 0,
					generic: {},
					system: {
						'message-box': 1,
					},
					withoutFallbackFonts: 0,
					imageReplacementHacks: 0,
					usage: {},
				});
			});
		});

		describe('.colors', () => {
			it('should be counted correctly', () => {
				expect(report.colors).toStrictEqual({
					total: 4,
					unique: 4,
					currentColorKeyword: 0,
					transparentKeyword: 0,
					models: {
						hex: 3,
						hexa: 0,
						rgb: 0,
						rgba: 0,
						hsl: 0,
						hsla: 0,
						hwb: 0,
					},
					named: {
						red: 1,
					},
					system: {},
					usage: {
						'#000000': 1,
						'#123123': 1,
						'#ffffff': 1,
						red: 1,
					},
				});
			});
		});

		describe('.backgroundColors', () => {
			it('should be counted correctly', () => {
				expect(report.backgroundColors).toStrictEqual({
					total: 2,
					unique: 2,
					currentColorKeyword: 0,
					transparentKeyword: 1,
					models: {
						hex: 1,
						hexa: 0,
						rgb: 0,
						rgba: 0,
						hsl: 0,
						hsla: 0,
						hwb: 0,
					},
					named: {},
					system: {},
					usage: {
						'#456456': 1,
						transparent: 1,
					},
				});
			});
		});

		describe('.allColors', () => {
			it('should be counted correctly', () => {
				expect(report.allColors).toStrictEqual({
					total: 6,
					unique: 6,
					currentColorKeyword: 0,
					transparentKeyword: 1,
					models: {
						hex: 4,
						hexa: 0,
						rgb: 0,
						rgba: 0,
						hsl: 0,
						hsla: 0,
						hwb: 0,
					},
					named: {
						red: 1,
					},
					system: {},
					usage: {
						'#000000': 1,
						'#123123': 1,
						'#456456': 1,
						'#ffffff': 1,
						red: 1,
						transparent: 1,
					},
				});
			});
		});

		describe('.transitions', () => {
			it('should be counted correctly', () => {
				expect(report.transitions).toStrictEqual({
					properties: {},
					longestDuration: 0,
					shortestDuration: Number.MAX_SAFE_INTEGER,
					longestDelay: 0,
					shortestDelay: Number.MAX_SAFE_INTEGER,
					timingFunctions: {},
					invalidTimingFunctions: {},
				});
			});
		});

		describe('.animations', () => {
			it('should be counted correctly', () => {
				expect(report.animations).toStrictEqual({
					total: 2,
					unique: 2,
					infinite: 1,
					longestDuration: 1,
					shortestDuration: 1,
					longestDelay: 0,
					shortestDelay: Number.MAX_SAFE_INTEGER,
					usage: {
						fade: 1,
						'fade-in': 1,
					},
					withoutDefinitions: [
						'fade-in',
					],
					timingFunctions: {
						ease: 2,
					},
					invalidTimingFunctions: {},
				});
			});
		});

		describe('.functions', () => {
			it('should be counted correctly', () => {
				expect(report.functions).toStrictEqual({
					total: 0,
					unique: 0,
					prefixed: 0,
					usage: {},
				});
			});
		});

		describe('.filters', () => {
			it('should be counted correctly', () => {
				expect(report.filters).toStrictEqual({
					total: 0,
					unique: 0,
					usage: {},
				});
			});
		});

		describe('.gradients', () => {
			it('should be counted correctly', () => {
				expect(report.gradients).toStrictEqual({
					total: 0,
					unique: 0,
					usage: {},
				});
			});
		});

		describe('.dataUris', () => {
			it('should be counted correctly', () => {
				expect(report.dataUris).toStrictEqual({
					total: 0,
					unique: 0,
					length: {
						total: 0,
						longest: 0,
						longestDataUri: null,
						average: 0,
					},
					sizeRatio: 0,
					sizeRatioPercent: '0%',
					usage: {},
				});
			});
		});

		describe('.browserHacks', () => {
			it('should be counted correctly', () => {
				expect(report.browserHacks).toStrictEqual({
					total: 0,
					usage: {
						supports: {},
						media: {},
					},
				});
			});
		});

		describe('.units', () => {
			it('should be counted correctly', () => {
				expect(report.units).toStrictEqual({
					total: 7,
					unique: 2,
					usage: {
						px: 5,
						s: 2,
					},
					excessive: {
						total: 0,
						unique: 0,
						usage: {},
					},
				});
			});
		});

		describe('.variables', () => {
			it('should be counted correctly', () => {
				expect(report.variables).toStrictEqual({
					total: 0,
					unique: 0,
					usage: {},
					valuesMap: {},
				});
			});
		});

		describe('.vendorPrefixes', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes).toStrictEqual({
					total: 2,
					unique: 2,
					unknown: {
						total: 0,
						unique: 0,
						usage: {},
					},
					usage: {
						'-moz-': 1,
						'-webkit-': 1,
					},
				});
			});
		});
	});

	describe('Options', () => {
		describe('stylesheetSize', () => {
			let report;

			const options = {
				stylesheetSize: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.stylesheetSize` counting when is set to `false`', () => {
				expect(report.stylesheetSize).toStrictEqual(getEmptyReport().stylesheetSize);
			});
		});

		describe('comments', () => {
			let report;

			const options = {
				comments: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.comments` counting when is set to `false`', () => {
				expect(report.comments).toStrictEqual(getEmptyReport().comments);
			});
		});

		describe('atRules', () => {
			let report;

			const options = {
				atRules: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.atRules` counting when is set to `false`', () => {
				expect(report.atRules).toStrictEqual(getEmptyReport().atRules);
			});

			it('should switch off `report.imports` counting when is set to `false`', () => {
				expect(report.imports).toStrictEqual(getEmptyReport().imports);
			});

			it('should switch off `report.mediaQueries` counting when is set to `false`', () => {
				expect(report.mediaQueries).toStrictEqual(getEmptyReport().mediaQueries);
			});

			it('should switch off `report.keyframes` counting when is set to `false`', () => {
				expect(report.keyframes).toStrictEqual(getEmptyReport().keyframes);
			});
		});

		describe('rules', () => {
			let report;

			const options = {
				rules: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.rules` counting when is set to `false`', () => {
				expect(report.rules).toStrictEqual(getEmptyReport().rules);
			});
		});

		describe('selectors', () => {
			let report;

			const options = {
				selectors: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.selectors` counting when is set to `false`', () => {
				expect(report.selectors).toStrictEqual(getEmptyReport().selectors);
			});
		});

		describe('selectorsUsage', () => {
			let report;

			const options = {
				selectorsUsage: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.selectors.usage` counting when is set to `false`', () => {
				expect(report.selectors.usage).toStrictEqual(getEmptyReport().selectors.usage);
			});
		});

		describe('attributesUsage', () => {
			let report;

			const options = {
				attributesUsage: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.selectors.attributesUsage` counting when is set to `false`', () => {
				expect(report.selectors.attributesUsage).toStrictEqual(getEmptyReport().selectors.attributesUsage);
			});
		});

		describe('declarations', () => {
			let report;

			const options = {
				declarations: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.declarations` counting when is set to `false`', () => {
				expect(report.declarations).toStrictEqual(getEmptyReport().declarations);
			});
		});

		describe('properties', () => {
			let report;

			const options = {
				properties: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.properties` counting when is set to `false`', () => {
				expect(report.properties).toStrictEqual(getEmptyReport().properties);
			});
		});

		describe('engineTriggerProperties', () => {
			let report;

			const options = {
				engineTriggerProperties: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.properties.engineTriggerProperties` counting when is set to `false`', () => {
				expect(report.properties.engineTriggerProperties).toStrictEqual(getEmptyReport().properties.engineTriggerProperties);
			});
		});

		describe('performanceHacks', () => {
			let report;

			const options = {
				performanceHacks: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.properties.performanceHacks` counting when is set to `false`', () => {
				expect(report.properties.performanceHacks).toStrictEqual(getEmptyReport().properties.performanceHacks);
			});
		});

		describe('displays', () => {
			let report;

			const options = {
				displays: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.displays` counting when is set to `false`', () => {
				expect(report.displays).toStrictEqual(getEmptyReport().displays);
			});
		});

		describe('positions', () => {
			let report;

			const options = {
				positions: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.positions` counting when is set to `false`', () => {
				expect(report.positions).toStrictEqual(getEmptyReport().positions);
			});
		});

		describe('zIndices', () => {
			let report;

			const options = {
				zIndices: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.zIndices` counting when is set to `false`', () => {
				expect(report.zIndices).toStrictEqual(getEmptyReport().zIndices);
			});
		});

		describe('floats', () => {
			let report;

			const options = {
				floats: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.floats` counting when is set to `false`', () => {
				expect(report.floats).toStrictEqual(getEmptyReport().floats);
			});
		});

		describe('borderRadiuses', () => {
			let report;

			const options = {
				borderRadiuses: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.borderRadiuses` counting when is set to `false`', () => {
				expect(report.borderRadiuses).toStrictEqual(getEmptyReport().borderRadiuses);
			});
		});

		describe('widths', () => {
			let report;

			const options = {
				widths: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.widths` counting when is set to `false`', () => {
				expect(report.widths).toStrictEqual(getEmptyReport().widths);
			});
		});

		describe('heights', () => {
			let report;

			const options = {
				heights: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.heights` counting when is set to `false`', () => {
				expect(report.heights).toStrictEqual(getEmptyReport().heights);
			});
		});

		describe('letterSpacings', () => {
			let report;

			const options = {
				letterSpacings: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.letterSpacings` counting when is set to `false`', () => {
				expect(report.letterSpacings).toStrictEqual(getEmptyReport().letterSpacings);
			});
		});

		describe('fonts', () => {
			let report;

			const options = {
				fonts: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.fontSizes` counting when is set to `false`', () => {
				expect(report.fontSizes).toStrictEqual(getEmptyReport().fontSizes);
			});

			it('should switch off `report.lineHeights` counting when is set to `false`', () => {
				expect(report.lineHeights).toStrictEqual(getEmptyReport().lineHeights);
			});

			it('should switch off `report.fontFamilies` counting when is set to `false`', () => {
				expect(report.fontFamilies).toStrictEqual(getEmptyReport().fontFamilies);
			});
		});

		describe('colors', () => {
			let report;

			const options = {
				colors: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.colors` counting when is set to `false`', () => {
				expect(report.colors).toStrictEqual(getEmptyReport().colors);
			});
		});

		describe('backgroundColors', () => {
			let report;

			const options = {
				backgroundColors: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.backgroundColors` counting when is set to `false`', () => {
				expect(report.backgroundColors).toStrictEqual(getEmptyReport().backgroundColors);
			});
		});

		describe('allColors', () => {
			let report;

			const options = {
				allColors: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.allColors` counting when is set to `false`', () => {
				expect(report.allColors).toStrictEqual(getEmptyReport().allColors);
			});
		});

		describe('transitionsAndAnimations', () => {
			let report;

			const options = {
				transitionsAndAnimations: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.transitions` counting when is set to `false`', () => {
				expect(report.transitions).toStrictEqual(getEmptyReport().transitions);
			});

			it('should switch off `report.animations` counting when is set to `false`', () => {
				expect(report.animations).toStrictEqual(getEmptyReport().animations);
			});
		});

		describe('functions', () => {
			let report;

			const options = {
				functions: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.functions` counting when is set to `false`', () => {
				expect(report.functions).toStrictEqual(getEmptyReport().functions);
			});
		});

		describe('filters', () => {
			let report;

			const options = {
				filters: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.filters` counting when is set to `false`', () => {
				expect(report.filters).toStrictEqual(getEmptyReport().filters);
			});
		});

		describe('gradients', () => {
			let report;

			const options = {
				gradients: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.gradients` counting when is set to `false`', () => {
				expect(report.gradients).toStrictEqual(getEmptyReport().gradients);
			});
		});

		describe('units', () => {
			let report;

			const options = {
				units: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.units` counting when is set to `false`', () => {
				expect(report.units).toStrictEqual(getEmptyReport().units);
			});
		});

		describe('variables', () => {
			let report;

			const options = {
				variables: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.variables` counting when is set to `false`', () => {
				expect(report.variables).toStrictEqual(getEmptyReport().variables);
			});
		});

		describe('dataUris', () => {
			let report;

			const options = {
				dataUris: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.dataUris` counting when is set to `false`', () => {
				expect(report.dataUris).toStrictEqual(getEmptyReport().dataUris);
			});
		});

		describe('browserHacks', () => {
			let report;

			const options = {
				browserHacks: false,
			};

			beforeEach(() => {
				report = scancss(src, options);
			});

			afterEach(() => {
				report = null;
			});

			it('should switch off `report.browserHacks` counting when is set to `false`', () => {
				expect(report.browserHacks).toStrictEqual(getEmptyReport().browserHacks);
			});
		});
	});
});
