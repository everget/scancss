import { maxSafeInteger } from './constants/maxSafeInteger';
import scancss from '.';

describe('Module: scancss', () => {
	let report;

	const options = {};

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
			border: 1px solid #123123;
			width: 40px;
			height: 40px;
			font: message-box;
			background-color: transparent;
			color: #fff;
		}

		.selector {}

		::-moz-placeholder {
			color: red;
		}

		@-webkit-keyframes fade {
			from,
			10% {
				opacity: 1;
			}

			88%,
			to {
				opacity: 0;
			}
		}


		@keyframes fade {
			from,
			10% {
				opacity: 1;
			}

			88%,
			to {
				opacity: 0;
			}
		}

		@media screen and (max-width: 480px) {
			.selector {
				width: 20px;
				height: 20px;
				background-color: #456456;
				color: #000;
				animation: infinite ease 1s fade;
			}
		}

		@foobar {}
	`;

	beforeEach(() => {
		report = scancss(src, options);
	});

	afterEach(() => {
		report = null;
	});

	describe('Throwing errors', () => {
		it('should throw error if 1st argument does not have `string` type', () => {
			expect(() => {
				scancss(NaN);
			}).toThrowError('`scancss` expects a string');
		});
	});

	describe('Report', () => {
		describe('styleSheetSize', () => {
			it('should be counted correctly', () => {
				expect(report.styleSheetSize).toEqual({
					sourceByteLength: 909,
					gzipByteLength: 439,
				});
			});
		});

		describe('comments', () => {
			it('should be counted correctly', () => {
				expect(report.comments).toEqual({
					total: 1,
					totalByteLength: 32,
					longestByteLength: 32,
					shortestByteLength: 32,
					averageByteLength: 32,
					sizeRatio: 0.0352035203520352,
				});
			});
		});

		describe('atRules', () => {
			it('should be counted correctly', () => {
				expect(report.atRules).toEqual({
					total: 5,
					empty: 1,
					vendorPrefixed: 1,
					unknown: {
						foobar: 1,
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

		describe('mediaQueries', () => {
			it('should be counted correctly', () => {
				expect(report.mediaQueries).toEqual({
					total: 1,
					unique: 1,
					onlyKeywords: 0,
					types: {
						screen: 1,
					},
					vendorPrefixedFeatures: 0,
					features: {
						'max-width': 1,
					},
					usage: {
						'screen and (max-width:480px)': 1,
					},
				});
			});
		});

		describe('keyframes', () => {
			it('should be counted correctly', () => {
				expect(report.keyframes).toEqual({
					stepsChains: {
						'0% -> 10% -> 88% -> 100%': 2,
					},
					longestStepsChain: '0% -> 10% -> 88% -> 100%',
					longestStepsChainLength: 4,
					shortestStepsChain: '0% -> 10% -> 88% -> 100%',
					shortestStepsChainLength: 4,
					animatableProperties: [
						'opacity',
					],
				});
			});
		});

		describe('rules', () => {
			it('should be counted correctly', () => {
				expect(report.rules).toEqual({
					total: 8,
					empty: 1,
				});
			});
		});

		describe('selectors', () => {
			it('should be counted correctly', () => {
				expect(report.selectors).toEqual({
					total: 4,
					unique: 2,
					baseUsage: {
						class: 3,
						pseudoElement: 1,
					},
					pseudoClassesUsage: {},
					pseudoElementsUsage: {
						'::-moz-placeholder': 1,
					},
					combinators: {
						total: 0,
						adjacentSibling: 0,
						child: 0,
						descendant: 0,
						generalSibling: 0,
					},
					complex: 0,
					maxPerRule: 1,
					averagePerRule: 0.5,
					totalByteLength: 45,
					longestByteLength: 18,
					longestByteLengthSelector: '::-moz-placeholder',
					averageByteLength: 11.25,
					totalSpecificity: [0, 4, 0],
					averageSpecificity: [0, 0, 0],
					highestSpecificity: [0, 1, 0],
					highestSpecificitySelector: '.selector',
					sizeRatio: 0.04950495049504951,
					specificityGraphData: [
						[0, 1, 0],
						[0, 1, 0],
						[0, 1, 0],
						[0, 1, 0],
					],
					usage: {
						'.selector': 3,
						'::-moz-placeholder': 1,
					},
				});
			});
		});

		describe('declarations', () => {
			it('should be counted correctly', () => {
				expect(report.declarations).toEqual({
					total: 21,
					unique: 19,
					uniqueRatio: 1.105263157894737,
					important: 0,
					averagePerRule: 2.63,
					totalByteLength: 446,
					longestByteLength: 129,
					longestByteLengthDeclaration: 'src:url(\'/fonts/OpenSans-Regular-webfont.woff2\') format(\'woff2\'),url(\'/fonts/OpenSans-Regular-webfont.woff\') format(\'woff\')',
					averageByteLength: 21.24,
					sizeRatio: 0.49064906490649063,
					inAtRules: {
						'-webkit-keyframes': 2,
						'font-face': 2,
						keyframes: 2,
						media: 5,
					},
					list: [
						'font-family:\'Open Sans\'',
						'src:url(\'/fonts/OpenSans-Regular-webfont.woff2\') format(\'woff2\'),url(\'/fonts/OpenSans-Regular-webfont.woff\') format(\'woff\')',
						'display:inline-block',
						'position:fixed',
						'z-index:\'\'',
						'border:1px solid #123123',
						'width:40px',
						'height:40px',
						'font:message-box',
						'background-color:transparent',
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

		describe('properties', () => {
			it('should be counted correctly', () => {
				expect(report.properties).toEqual({
					total: 21,
					unique: 13,
					shorthands: 3,
					vendorPrefixed: 0,
					unitless: 15,
					resetsViaAll: 0,
					negativeMargins: 0,
					anonymousReplacedElements: 0,
					performanceHacks: {},
					explicitDefaultingKeywords: {
						total: 0,
						inherit: 0,
						initial: 0,
						revert: 0,
						unset: 0,
					},
					engineTriggers: {
						composite: {
							blink: 17,
							edgehtml: 17,
							gecko: 17,
							webkit: 17,
						},
						layout: {
							blink: 7,
							edgehtml: 11,
							gecko: 7,
							webkit: 17,
						},
						paint: {
							blink: 17,
							edgehtml: 17,
							gecko: 13,
							webkit: 17,
						},
					},
					usage: {
						animation: 1,
						'background-color': 2,
						border: 1,
						color: 3,
						display: 1,
						font: 1,
						'font-family': 1,
						height: 2,
						opacity: 4,
						position: 1,
						src: 1,
						width: 2,
						'z-index': 1,
					},
				});
			});
		});

		describe('displays', () => {
			it('should be counted correctly', () => {
				expect(report.displays).toEqual({
					total: 1,
					unique: 1,
					usage: {
						'inline-block': 1,
					},
				});
			});
		});

		describe('positions', () => {
			it('should be counted correctly', () => {
				expect(report.positions).toEqual({
					total: 1,
					unique: 1,
					usage: {
						fixed: 1,
					},
				});
			});
		});

		describe('zIndices', () => {
			it('should be counted correctly', () => {
				expect(report.zIndices).toEqual({
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

		describe('floats', () => {
			it('should be counted correctly', () => {
				expect(report.floats).toEqual({
					total: 0,
					unique: 0,
					usage: {},
				});
			});
		});

		describe('borderRadiuses', () => {
			it('should be counted correctly', () => {
				expect(report.borderRadiuses).toEqual({
					total: 0,
					unique: 0,
					usage: {},
				});
			});
		});

		describe('letterSpacings', () => {
			it('should be counted correctly', () => {
				expect(report.letterSpacings).toEqual({
					total: 0,
					unique: 0,
					usage: {},
				});
			});
		});

		describe('fontSizes', () => {
			it('should be counted correctly', () => {
				expect(report.fontSizes).toEqual({
					total: 0,
					unique: 0,
					usage: {},
				});
			});
		});

		describe('lineHeights', () => {
			it('should be counted correctly', () => {
				expect(report.lineHeights).toEqual({
					total: 0,
					unique: 0,
					hardCoded: 0,
					usage: {},
				});
			});
		});

		describe('fontFamilies', () => {
			it('should be counted correctly', () => {
				expect(report.fontFamilies).toEqual({
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

		describe('colors', () => {
			it('should be counted correctly', () => {
				expect(report.colors).toEqual({
					total: 4,
					unique: 4,
					currentColorKeyword: 0,
					transparentKeyword: 0,
					models: {
						hex: 3,
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

		describe('backgroundColors', () => {
			it('should be counted correctly', () => {
				expect(report.backgroundColors).toEqual({
					total: 2,
					unique: 2,
					currentColorKeyword: 0,
					transparentKeyword: 1,
					models: {
						hex: 1,
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

		describe('allColors', () => {
			it('should be counted correctly', () => {
				expect(report.allColors).toEqual({
					total: 6,
					unique: 6,
					currentColorKeyword: 0,
					transparentKeyword: 1,
					models: {
						hex: 4,
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

		describe('transitions', () => {
			it('should be counted correctly', () => {
				expect(report.transitions).toEqual({
					properties: {},
					longestDuration: 0,
					shortestDuration: maxSafeInteger,
					longestDelay: 0,
					shortestDelay: maxSafeInteger,
					timingFunctions: {},
					invalidTimingFunctions: {},
				});
			});
		});

		describe('animations', () => {
			it('should be counted correctly', () => {
				expect(report.animations).toEqual({
					infinite: 1,
					longestDuration: 1,
					shortestDuration: 1,
					longestDelay: 0,
					shortestDelay: maxSafeInteger,
					timingFunctions: {
						ease: 1,
					},
					invalidTimingFunctions: {},
				});
			});
		});

		describe('functions', () => {
			it('should be counted correctly', () => {
				expect(report.functions).toEqual({
					total: 2,
					unique: 1,
					usage: {
						url: 2,
					},
				});
			});
		});

		describe('gradients', () => {
			it('should be counted correctly', () => {
				expect(report.gradients).toEqual({
					total: 0,
					unique: 0,
					usage: {},
				});
			});
		});

		describe('dataUris', () => {
			it('should be counted correctly', () => {
				expect(report.dataUris).toEqual({
					total: 0,
					unique: 0,
					totalByteLength: 0,
					averageByteLength: 0,
					sizeRatio: 0,
					usage: {},
				});
			});
		});

		describe('browserHacks', () => {
			it('should be counted correctly', () => {
				expect(report.browserHacks).toEqual({
					total: 0,
					usage: {
						supports: {},
						media: {},
					},
				});
			});
		});

		describe('units', () => {
			it('should be counted correctly', () => {
				expect(report.units).toEqual({
					total: 6,
					unique: 2,
					usage: {
						px: 5,
						s: 1,
					},
					excessive: 0,
					excessiveUsage: {},
				});
			});
		});

		describe('variables', () => {
			it('should be counted correctly', () => {
				expect(report.variables).toEqual({
					total: 0,
					unique: 0,
					usage: {},
					valuesMap: {},
				});
			});
		});

		describe('vendorPrefixes', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes).toEqual({
					total: 2,
					unique: 2,
					unknown: {},
					usage: {
						'-moz-': 1,
						'-webkit-': 1,
					},
				});
			});
		});
	});
});
