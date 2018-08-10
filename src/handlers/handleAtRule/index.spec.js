import { parseCss } from '../../converters/parseCss';
import { handleAtRule } from '.';

describe('Module: handleAtRule', () => {
	const options = {
		collectBrowserHacksData: true,
	};

	const src = `
		@import 'custom.css';
		@import "common.css" screen;
		@import url("fineprint.css") print;
		@import url("bluish.css") speech;

		@media screen and (max-width: 479px) {
			.selector {
				max-width: none;
			}
		}

		@media only screen and (max-width: 767px) {
			.selector {
				display: block;
				margin-top: 5px;
			}
		}

		@media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: .001dpcm) {
			.selector {}
		}

		@media print {
			.selector {}
		}

		@media only screen and (max-height: 440px), only screen and (max-width: 600px) {
			.selector {
				display: none!important;
			}
		}

		@media screen and (max-width: 767px) {
			.selector {
				display: none;
			}
		}

		@media screen and (min--moz-device-pixel-ratio: 0) {}

		@media screen and (min-width: 992px) {}

		@media screen and (min-width: 992px) {}

		@media screen and (min-aspect-ratio: 16/9) {}

		@media screen and (device-pixel-ratio: 4/3) {}
		@media screen and (-webkit-device-pixel-ratio: 4/3) {}

		@supports (-webkit-appearance: none) {}

		@supports (-moz-appearance: meterbar) {}

		@supports (-moz-appearance: meterbar) and (all: initial) {}

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
		report = {
			atRules: {
				total: 0,
				empty: 0,
				prefixed: 0,
				unknown: {},
				usage: {},
			},
			mediaQueries: {
				total: 0,
				unique: 0,
				onlyKeyword: 0,
				types: {},
				features: {
					total: 0,
					unique: 0,
					prefixed: 0,
					usage: {},
				},
				usage: {},
			},
			keyframes: {
				stepsChains: {},
				longestStepsChain: 0,
				longestStepsChainLength: 0,
				longestStepsChainAnimation: null,
				shortestStepsChain: 0,
				shortestStepsChainLength: Number.MAX_SAFE_INTEGER,
				shortestStepsChainAnimation: null,
				animatableProperties: [],
			},
			declarations: {
				inAtRules: {},
			},
			vendorPrefixes: {
				total: 0,
				unique: 0,
				unknown: {},
				usage: {},
			},
			browserHacks: {
				total: 0,
				usage: {
					supports: {},
					media: {},
					selector: {},
					property: {},
				},
			},
		};

		cssRoot.walkAtRules((atRule) => {
			handleAtRule(atRule, report, options);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('atRules.total', () => {
		it('should be counted correctly', () => {
			expect(report.atRules.total).toBe(23);
		});
	});

	describe('atRules.empty', () => {
		it('should be counted correctly', () => {
			expect(report.atRules.empty).toBe(11);
		});
	});

	describe('atRules.prefixed', () => {
		it('should be counted correctly', () => {
			expect(report.atRules.prefixed).toBe(2);
		});
	});

	describe('atRules.unknown', () => {
		it('should be counted correctly', () => {
			expect(report.atRules.unknown).toEqual({
				unknown: 1,
			});
		});
	});

	describe('atRules.usage', () => {
		it('should be counted correctly', () => {
			expect(report.atRules.usage).toEqual({
				'-moz-document': 1,
				'-webkit-keyframes': 1,
				import: 4,
				keyframes: 1,
				media: 12,
				supports: 3,
				unknown: 1,
			});
		});
	});

	describe('declarations.inAtRules', () => {
		it('should be counted correctly', () => {
			expect(report.declarations.inAtRules).toEqual({
				media: 5,
				keyframes: 3,
				'-webkit-keyframes': 4,
			});
		});
	});

	describe('mediaQueries.total', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.total).toBe(15);
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

	describe('mediaQueries.types', () => {
		it('should be counted mediaQueries.types correctly', () => {
			expect(report.mediaQueries.types).toEqual({
				all: 1,
				print: 2,
				screen: 12,
				speech: 1,
			});
		});
	});

	describe('mediaQueries.features.total', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.features.total).toBe(13);
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

	describe('mediaQueries.features.usage', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.features.usage).toEqual({
				'max-height': 1,
				'max-width': 4,
				'min-width': 2,
				'min-aspect-ratio': 1,
				'min-resolution': 1,
				'min--moz-device-pixel-ratio': 1,
				'-webkit-min-device-pixel-ratio': 1,
				'-webkit-device-pixel-ratio': 1,
				'device-pixel-ratio': 1,
			});
		});
	});

	describe('mediaQueries.usage', () => {
		it('should be counted correctly', () => {
			expect(report.mediaQueries.usage).toEqual({
				'all and (-webkit-min-device-pixel-ratio:0) and (min-resolution:.001dpcm)': 1,
				'only screen and (max-height:440px),only screen and (max-width:600px)': 1,
				'only screen and (max-width:767px)': 1,
				print: 2,
				screen: 1,
				'screen and (max-width:479px)': 1,
				'screen and (max-width:767px)': 1,
				'screen and (min-width:992px)': 2,
				'screen and (min--moz-device-pixel-ratio:0)': 1,
				'screen and (min-aspect-ratio:16/9)': 1,
				'screen and (-webkit-device-pixel-ratio:4/3)': 1,
				'screen and (device-pixel-ratio:4/3)': 1,
				speech: 1,
			});
		});
	});

	describe('keyframes.stepsChains', () => {
		it('should be counted correctly', () => {
			expect(report.keyframes.stepsChains).toEqual({
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
			expect(report.keyframes.animatableProperties).toEqual([
				'transform',
				'opacity',
			]);
		});
	});
});
