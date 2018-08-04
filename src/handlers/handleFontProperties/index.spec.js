import postcss from 'postcss';
import { default as safeParser } from 'postcss-safe-parser';

import { handleFontProperties } from '.';

describe('Module: handleFontProperties', () => {
	const src = `
		.selector {
			font: normal 13px/20px Helvetica Neue,Helvetica,Arial,sans-serif;
		}

		.selector {
			font:12px/1.5 tahoma,arial;
		}

		.selector {
			font-size:12px;
			font-family:monospace;
			line-height:1.15;
		}

		.selector {
			font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
			font-size:10px;
			line-height:1.25;
		}

		.selector {
			font-family: Icons;
			font-size: 3.125em;
		}

		.selector {
			font-size: 1em;
			line-height: 1.5em;
		}

		.selector {
			font-size:75%;
			line-height:0;
		}

		.selector {
			font-family: "Gotham SSm A", "Gotham SSm B", Helvetica, Arial, sans-serif;
			font-size: 1.96875rem;
			line-height: 1.3;
		}

		.selector {
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		}

		.selector {
			font: inherit;
		}

		.selector {
			font: status-bar;
		}

		.selector {
			font: message-box;
		}

		.selector {
			font: 0/0 a;
		}
	`;

	const cssRoot = postcss.parse(
		postcss().process(src, { parser: safeParser }).root
	);

	let report;

	beforeEach(() => {
		report = {
			fontSizes: {
				total: 0,
				unique: 0,
				usage: {},
			},
			lineHeights: {
				total: 0,
				unique: 0,
				hardCoded: 0,
				usage: {},
			},
			fontFamilies: {
				total: 0,
				unique: 0,
				generic: {},
				system: {},
				withoutFallbackFonts: 0,
				imageReplacementHacks: 0,
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
			handleFontProperties(decl, report);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('fontSizes.total', () => {
		it('should be counted correctly', () => {
			expect(report.fontSizes.total).toBe(10);
		});
	});

	describe('fontSizes.unique', () => {
		it('should be counted correctly', () => {
			expect(report.fontSizes.unique).toBe(0);
		});
	});

	describe('fontSizes.usage', () => {
		it('should be counted correctly', () => {
			/* eslint-disable quote-props */
			expect(report.fontSizes.usage).toEqual({
				'0': 1,
				'1.96875rem': 1,
				'10px': 1,
				'12px': 2,
				'13px': 1,
				'1em': 1,
				'3.125em': 1,
				'75%': 1,
				inherit: 1,
			});
			/* eslint-enable quote-props */
		});
	});

	describe('lineHeights.total', () => {
		it('should be counted correctly', () => {
			expect(report.lineHeights.total).toBe(9);
		});
	});

	describe('lineHeights.unique', () => {
		it('should be counted correctly', () => {
			expect(report.lineHeights.unique).toBe(0);
		});
	});

	describe('lineHeights.hardCoded', () => {
		it('should be counted correctly', () => {
			expect(report.lineHeights.hardCoded).toBe(3);
		});
	});

	describe('lineHeights.usage', () => {
		it('should be counted correctly', () => {
			/* eslint-disable quote-props */
			expect(report.lineHeights.usage).toEqual({
				'0': 2,
				'1.15': 1,
				'1.25': 1,
				'1.3': 1,
				'1.5': 1,
				'1.5em': 1,
				'20px': 1,
				inherit: 1,
			});
			/* eslint-enable quote-props */
		});
	});

	describe('fontFamilies.total', () => {
		it('should be counted correctly', () => {
			expect(report.fontFamilies.total).toBe(29);
		});
	});

	describe('fontFamilies.unique', () => {
		it('should be counted correctly', () => {
			expect(report.fontFamilies.unique).toBe(0);
		});
	});

	describe('fontFamilies.system', () => {
		it('should be counted correctly', () => {
			expect(report.fontFamilies.system).toEqual({
				'message-box': 1,
				'status-bar': 1,
			});
		});
	});

	describe('fontFamilies.generic', () => {
		it('should be counted correctly', () => {
			expect(report.fontFamilies.generic).toEqual({
				'sans-serif': 4,
				monospace: 1,
			});
		});
	});

	describe('fontFamilies.withoutFallbackFonts', () => {
		it('should be counted correctly', () => {
			expect(report.fontFamilies.withoutFallbackFonts).toBe(4);
		});
	});

	describe('fontFamilies.imageReplacementHacks', () => {
		it('should be counted correctly', () => {
			expect(report.fontFamilies.imageReplacementHacks).toBe(1);
		});
	});

	describe('fontFamilies.usage', () => {
		it('should be counted correctly', () => {
			expect(report.fontFamilies.usage).toEqual({
				'-apple-system': 1,
				'Apple Color Emoji': 1,
				Arial: 4,
				BlinkMacSystemFont: 1,
				'Gotham SSm A': 1,
				'Gotham SSm B': 1,
				Helvetica: 3,
				'Helvetica Neue': 3,
				Icons: 1,
				Roboto: 1,
				'Segoe UI': 1,
				'Segoe UI Emoji': 1,
				'Segoe UI Symbol': 1,
				a: 1,
				arial: 1,
				inherit: 1,
				monospace: 1,
				'sans-serif': 4,
				tahoma: 1,
			});
		});
	});

	describe('vendorPrefixes.total', () => {
		it('should be counted correctly', () => {
			expect(report.vendorPrefixes.total).toBe(1);
		});
	});

	describe('vendorPrefixes.usage', () => {
		it('should be counted correctly', () => {
			expect(report.vendorPrefixes.usage).toEqual({
				'-apple-': 1,
			});
		});
	});
});
