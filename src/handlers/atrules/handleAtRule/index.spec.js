import { getEmptyReport } from '../../../common/getEmptyReport';
import { parseCss } from '../../../common/parseCss';
import { handleAtRule } from '.';

describe('Module: handleAtRule', () => {
	const options = {
		browserHacks: true,
		declarations: true,
		functions: true,
	};

	const src = `
		@import 'custom.css';
		@import "common.css" screen;
		@import url("fineprint.css") print;
		@import url("bluish.css") speech;

		@page {}
		@page narrow {}
		@page rotated {}
		@page :first {}
		@page index :blank {}

		@document url(http://www.w3.org/),
			url-prefix(http://www.w3.org/Style/),
			domain(mozilla.org),
			media-document(video),
			regexp("https:.*") {
			body {
				color: purple;
				background: yellow;
			}
		}

		@font-face {
			font-family: 'Open Sans';
			src: url('/fonts/OpenSans-Regular-webfont.woff2') format('woff2'),
				url('/fonts/OpenSans-Regular-webfont.woff') format('woff');
		}

		@media aural {}
		@media projection {}
		@media tty {}

		@media screen and (max-width: 479px) {
			.selector {
				display: block;
			}
		}

		@media only screen and (max-width: 767px) {
			.selector {
				display: block;
			}
		}

		@media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.0010dpcm) {
			.selector {
				display: block;
			}
		}

		@media print {
			.selector {
				display: block;
			}
		}

		@media only screen and (max-height: 440px), only screen and (max-width: 600px) {
			.selector {
				display: block;
			}
		}

		@media screen and (max-width: 767px) {
			.selector {
				display: block;
			}
		}

		@media screen and (min-width: 992px) {}
		@media screen and (min-width: 992px) {}
		@media screen and (min-aspect-ratio: 16/9) {}
		@media screen and (device-pixel-ratio: 4/3) {}
		@media screen and (-webkit-device-pixel-ratio: 4/3) {}
		@media screen and (min--moz-device-pixel-ratio: 0) {}

		@media screen and (device-aspect-ratio: 16/9) {}
		@media screen and (device-width: 320px) {}
		@media screen and (device-height: 640px) {}
		@media screen and (min-device-aspect-ratio: 16/9) {}
		@media screen and (min-device-width: 320px) {}
		@media screen and (min-device-height: 640px) {}

		@supports (-webkit-appearance: none) {}
		@supports (-moz-appearance: meterbar) {}
		@supports (-moz-appearance: meterbar) and (all: initial) {}
		@supports (display: table-cell) and (display: list-item) {}

		@keyframes pulse {
			0% {
				transform: scale(.8);
			}

			50% {
				opacity: 1;
			}

			70%,
			to {
				transform: scale(1);
			}
		}

		@-webkit-keyframes fade {
			from,
			10% {
				opacity: 1;
			}

			33% {
				opacity: 0.66;
			}

			66% {
				opacity: 0.33;
			}

			88%,
			to {
				opacity: 0;
			}
		}

		@-moz-document url-prefix() {}

		@unknown {}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = getEmptyReport();

		cssRoot.walkAtRules((atRule) => {
			handleAtRule(atRule, report, options);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('atRules.total', () => {
		it('should be counted correctly', () => {
			expect(report.atRules.total).toBe(40);
		});
	});

	describe('atRules.empty', () => {
		it('should be counted correctly', () => {
			expect(report.atRules.empty).toBe(26);
		});
	});

	describe('atRules.prefixed', () => {
		it('should be counted correctly', () => {
			expect(report.atRules.prefixed).toBe(2);
		});
	});

	describe('atRules.unknown.total', () => {
		it('should be counted correctly', () => {
			expect(report.atRules.unknown.total).toBe(1);
		});
	});

	describe('atRules.unknown.unique', () => {
		it('should be counted correctly', () => {
			expect(report.atRules.unknown.unique).toBe(0);
		});
	});

	describe('atRules.unknown.usage', () => {
		it('should be counted correctly', () => {
			expect(report.atRules.unknown.usage).toStrictEqual({
				unknown: 1,
			});
		});
	});

	describe('atRules.usage', () => {
		it('should be counted correctly', () => {
			expect(report.atRules.usage).toStrictEqual({
				'-moz-document': 1,
				'-webkit-keyframes': 1,
				document: 1,
				'font-face': 1,
				import: 4,
				keyframes: 1,
				media: 21,
				page: 5,
				supports: 4,
				unknown: 1,
			});
		});
	});

	describe('declarations.inAtRules', () => {
		it('should be counted correctly', () => {
			expect(report.declarations.inAtRules).toStrictEqual({
				document: 2,
				media: 6,
				keyframes: 3,
				'-webkit-keyframes': 4,
			});
		});
	});

	describe('imports.total', () => {
		it('should be counted correctly', () => {
			expect(report.imports.total).toBe(4);
		});
	});

	describe('imports.unique', () => {
		it('should be counted correctly', () => {
			expect(report.imports.unique).toBe(0);
		});
	});

	describe('imports.usage', () => {
		it('should be counted correctly', () => {
			expect(report.imports.usage).toStrictEqual({
				'\'custom.css\'': 1,
				'"common.css" screen': 1,
				'url("fineprint.css") print': 1,
				'url("bluish.css") speech': 1,
			});
		});
	});

	describe('imports.urls', () => {
		it('should be counted correctly', () => {
			expect(report.imports.urls).toStrictEqual({
				'custom.css': 1,
				'common.css': 1,
				'fineprint.css': 1,
				'bluish.css': 1,
			});
		});
	});

	describe('mediaQueries.total', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.total).toBe(25);
		});
	});

	describe('mediaQueries.unique', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.unique).toBe(0);
		});
	});

	describe('mediaQueries.onlyKeyword', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.onlyKeyword).toBe(3);
		});
	});

	describe('mediaQueries.types.total', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.types.total).toBe(25);
		});
	});

	describe('mediaQueries.types.unique', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.types.unique).toBe(0);
		});
	});

	describe('mediaQueries.types.deprecated.total', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.types.deprecated.total).toBe(3);
		});
	});

	describe('mediaQueries.types.deprecated.unique', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.types.deprecated.unique).toBe(0);
		});
	});

	describe('mediaQueries.types.deprecated.usage', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.types.deprecated.usage).toStrictEqual({
				aural: 1,
				projection: 1,
				tty: 1,
			});
		});
	});

	describe('mediaQueries.types.usage', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.types.usage).toStrictEqual({
				all: 1,
				aural: 1,
				print: 2,
				projection: 1,
				screen: 18,
				speech: 1,
				tty: 1,
			});
		});
	});

	describe('mediaQueries.features.total', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.features.total).toBe(19);
		});
	});

	describe('mediaQueries.features.unique', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.features.unique).toBe(0);
		});
	});

	describe('mediaQueries.features.prefixed', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.features.prefixed).toBe(3);
		});
	});

	describe('mediaQueries.features.deprecated.total', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.features.deprecated.total).toBe(6);
		});
	});

	describe('mediaQueries.features.deprecated.unique', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.features.deprecated.unique).toBe(0);
		});
	});

	describe('mediaQueries.features.deprecated.usage', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.features.deprecated.usage).toStrictEqual({
				'device-aspect-ratio': 1,
				'device-width': 1,
				'device-height': 1,
				'min-device-aspect-ratio': 1,
				'min-device-width': 1,
				'min-device-height': 1,
			});
		});
	});

	describe('mediaQueries.features.usage', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.features.usage).toStrictEqual({
				'max-height': 1,
				'max-width': 4,
				'min-width': 2,
				'min-aspect-ratio': 1,
				'min-resolution': 1,
				'min--moz-device-pixel-ratio': 1,
				'-webkit-min-device-pixel-ratio': 1,
				'-webkit-device-pixel-ratio': 1,
				'device-pixel-ratio': 1,
				'device-aspect-ratio': 1,
				'device-width': 1,
				'device-height': 1,
				'min-device-aspect-ratio': 1,
				'min-device-width': 1,
				'min-device-height': 1,
			});
		});
	});

	describe('mediaQueries.usage', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.usage).toStrictEqual({
				aural: 1,
				print: 2,
				projection: 1,
				screen: 1,
				speech: 1,
				tty: 1,
				'all and (-webkit-min-device-pixel-ratio:0) and (min-resolution:.001dpcm)': 1,
				'only screen and (max-height:440px)': 1,
				'only screen and (max-width:600px)': 1,
				'only screen and (max-width:767px)': 1,
				'screen and (max-width:479px)': 1,
				'screen and (max-width:767px)': 1,
				'screen and (min-width:992px)': 2,
				'screen and (min--moz-device-pixel-ratio:0)': 1,
				'screen and (min-aspect-ratio:16/9)': 1,
				'screen and (-webkit-device-pixel-ratio:4/3)': 1,
				'screen and (device-pixel-ratio:4/3)': 1,
				'screen and (device-aspect-ratio:16/9)': 1,
				'screen and (device-width:320px)': 1,
				'screen and (device-height:640px)': 1,
				'screen and (min-device-aspect-ratio:16/9)': 1,
				'screen and (min-device-width:320px)': 1,
				'screen and (min-device-height:640px)': 1,
			});
		});
	});

	describe('keyframes.stepsChains', () => {
		it('should be counted correctly', () => {
			expect(report.keyframes.stepsChains).toStrictEqual({
				'0% -> 10% -> 33% -> 66% -> 88% -> 100%': 1,
				'0% -> 50% -> 70% -> 100%': 1,
			});
		});
	});

	describe('keyframes.longestStepsChain', () => {
		it('should be counted correctly', () => {
			expect(report.keyframes.longestStepsChain).toBe('0% -> 10% -> 33% -> 66% -> 88% -> 100%');
		});
	});

	describe('keyframes.longestStepsChainLength', () => {
		it('should be counted correctly', () => {
			expect(report.keyframes.longestStepsChainLength).toBe(6);
		});
	});

	describe('keyframes.longestStepsChainAnimation', () => {
		it('should be counted correctly', () => {
			expect(report.keyframes.longestStepsChainAnimation).toBe('fade');
		});
	});

	describe('keyframes.shortestStepsChain', () => {
		it('should be counted correctly', () => {
			expect(report.keyframes.shortestStepsChain).toBe('0% -> 50% -> 70% -> 100%');
		});
	});

	describe('keyframes.shortestStepsChainLength', () => {
		it('should be counted correctly', () => {
			expect(report.keyframes.shortestStepsChainLength).toBe(4);
		});
	});

	describe('keyframes.shortestStepsChainAnimation', () => {
		it('should be counted correctly', () => {
			expect(report.keyframes.shortestStepsChainAnimation).toBe('pulse');
		});
	});

	describe('keyframes.animatableProperties', () => {
		it('should be counted correctly', () => {
			expect(report.keyframes.animatableProperties).toStrictEqual([
				'transform',
				'opacity',
			]);
		});
	});

	describe('keyframes.definedAnimations', () => {
		it('should be counted correctly', () => {
			expect(report.keyframes.definedAnimations).toStrictEqual([
				'pulse',
				'fade',
			]);
		});
	});

	describe('Handling @page pseudo-classes', () => {
		it('should not be handled', () => {
			expect(report.selectors.baseUsage.pseudoClass).toBe(0);
		});

		it('should be counted correctly', () => {
			expect(report.selectors.pseudoClassesUsage).toStrictEqual({});
		});
	});

	describe('Handling functions in at-rules', () => {
		describe('functions.total', () => {
			it('should be counted correctly', () => {
				expect(report.functions.total).toBe(10);
			});
		});

		describe('functions.unique', () => {
			it('should be counted correctly', () => {
				expect(report.functions.unique).toBe(0);
			});
		});

		describe('functions.prefixed', () => {
			it('should be counted correctly', () => {
				expect(report.functions.prefixed).toBe(0);
			});
		});

		describe('functions.usage', () => {
			it('should be counted correctly', () => {
				expect(report.functions.usage).toStrictEqual({
					url: 5,
					'url-prefix': 2,
					domain: 1,
					'media-document': 1,
					regexp: 1,
				});
			});
		});
	});

	describe('Handling vendor prefixes', () => {
		describe('vendorPrefixes.total', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes.total).toBe(8);
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
				expect(report.vendorPrefixes.unknown.usage).toStrictEqual({});
			});
		});

		describe('vendorPrefixes.usage', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes.usage).toStrictEqual({
					'-moz-': 4,
					'-webkit-': 4,
				});
			});
		});
	});
});
