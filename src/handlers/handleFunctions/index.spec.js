import postcss from 'postcss';
import { default as safeParser } from 'postcss-safe-parser';

import { handleFunctions } from '.';

describe('Module: handleFunctions', () => {
	const options = {
		collectTransitionsAndAnimationsData: true,
		collectDataUrisData: true,
		collectGradientsData: true,
	};

	const src = `
		.selector: {
			right: calc(50% - 530px);
			width: calc(100% - 80px);
			height: calc(40% - 40px);
			background-color: var(--main-bg-color);
			color: rgb(255, 0, 215);
			transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
			transform: translateY(-150%) scale(.8);
		}

		.selector::after {
			content: attr(data-tooltip);
			line-height: calc(1.3em + (1.5 - 1.3) * ((100vw - 21em)/(35 - 21)));
			shape-outside: inset(50px);
			background: hsl(140, 80%, 70%);
			transition-timing-function: cubic-bezier(0.0, 0.0, 1, 1);
			transform: translateY(-150%) scale(.8) rotate(180deg);
			background-image: -webkit-linear-gradient(top, #2F2727, #1a82f7);
		}

		.selector: {
			width: min(1 * 10vw, 2 / 50vw);
			height: max(1 * 10vw, 2 / 50vw);
			clip-path: inset(50px round 15px);
			background: repeating-radial-gradient(red, yellow 10%, green 15%);
			transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
			transform: scale(.8);
			background-image: -moz-linear-gradient(top, #2F2727, #1a82f7);
		}

		.selector: {
			content: url('data:image/png;base64,TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0');
			background: radial-gradient(red, green, blue);
			animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
			transition-timing-function: cubic-bezier(0.1, red, 1.0, green),
			transform: rotate(180deg);
			background-image: -ms-linear-gradient(top, #2F2727, #1a82f7);
		}

		.selector: {
			content: url(data:image/jpeg;base64,aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1);
			background: hsl(var(--hue), 90%, 52%);
			animation-timing-function: cubic-bezier(0.3, 2.1);
			transition-timing-function: cubic-bezier(-1.9, 0.3, -0.2, 2.1);
			transform: translateY(-150%);
			background-image: -o-linear-gradient(top, #2F2727, #1a82f7);
		}
	`;

	const cssRoot = postcss.parse(
		postcss().process(src, { parser: safeParser }).root
	);

	let report;

	beforeEach(() => {
		report = {
			functions: {
				total: 0,
				unique: 0,
				vendorPrefixed: 0,
				usage: {},
			},
			gradients: {
				total: 0,
				unique: 0,
				usage: {},
			},
			transitions: {
				timingFunctions: {},
				invalidTimingFunctions: {},
			},
			animations: {
				timingFunctions: {},
				invalidTimingFunctions: {},
			},
			dataUris: {
				total: 0,
				unique: 0,
				totalByteLength: 0,
				averageByteLength: 0,
				sizeRatio: 0,
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
			handleFunctions(decl, report, options);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('Handling all functions', () => {
		describe('functions.total', () => {
			it('should be counted correctly', () => {
				expect(report.functions.total).toBe(37);
			});
		});

		describe('functions.unique', () => {
			it('should be counted correctly', () => {
				expect(report.functions.unique).toBe(0);
			});
		});

		describe('functions.vendorPrefixed', () => {
			it('should be counted correctly', () => {
				expect(report.functions.vendorPrefixed).toBe(4);
			});
		});

		describe('functions.usage', () => {
			it('should be counted correctly', () => {
				expect(report.functions.usage).toEqual({
					attr: 1,
					calc: 4,
					'cubic-bezier': 7,
					hsl: 2,
					inset: 2,
					max: 1,
					min: 1,
					'radial-gradient': 1,
					'repeating-radial-gradient': 1,
					rgb: 1,
					rotate: 2,
					scale: 3,
					translateY: 3,
					url: 2,
					var: 2,
					'-webkit-linear-gradient': 1,
					'-moz-linear-gradient': 1,
					'-ms-linear-gradient': 1,
					'-o-linear-gradient': 1,
				});
			});
		});
	});

	describe('Handling gradients', () => {
		describe('gradients.total', () => {
			it('should be counted correctly', () => {
				expect(report.gradients.total).toBe(6);
			});
		});

		describe('gradients.unique', () => {
			it('should be counted correctly', () => {
				expect(report.gradients.unique).toBe(0);
			});
		});

		describe('gradients.usage', () => {
			it('should be counted correctly', () => {
				expect(report.gradients.usage).toEqual({
					'repeating-radial-gradient(red,yellow 10%,green 15%)': 1,
					'radial-gradient(red,green,blue)': 1,
					'-webkit-linear-gradient(top,#2F2727,#1a82f7)': 1,
					'-moz-linear-gradient(top,#2F2727,#1a82f7)': 1,
					'-ms-linear-gradient(top,#2F2727,#1a82f7)': 1,
					'-o-linear-gradient(top,#2F2727,#1a82f7)': 1,
				});
			});
		});
	});

	describe('Handling timing functions', () => {
		describe('transitions.timingFunctions', () => {
			it('should be counted correctly', () => {
				expect(report.transitions.timingFunctions).toEqual({
					'cubic-bezier(0.1,0.7,1.0,0.1)': 1,
					'cubic-bezier(0.0,0.0,1,1)': 1,
					'cubic-bezier(0.25,0.1,0.25,1)': 1,
					'cubic-bezier(0.1,red,1.0,green)': 1,
					'cubic-bezier(-1.9,0.3,-0.2,2.1)': 1,
				});
			});
		});

		describe('transitions.invalidTimingFunctions', () => {
			it('should be counted correctly', () => {
				expect(report.transitions.invalidTimingFunctions).toEqual({
					'cubic-bezier(0.1,red,1.0,green)': 1,
					'cubic-bezier(-1.9,0.3,-0.2,2.1)': 1,
				});
			});
		});

		describe('animations.timingFunctions', () => {
			it('should be counted correctly', () => {
				expect(report.animations.timingFunctions).toEqual({
					'cubic-bezier(0.42,0,1,1)': 1,
					'cubic-bezier(0.3,2.1)': 1,
				});
			});
		});

		describe('animations.invalidTimingFunctions', () => {
			it('should be counted correctly', () => {
				expect(report.animations.invalidTimingFunctions).toEqual({
					'cubic-bezier(0.3,2.1)': 1,
				});
			});
		});
	});

	describe('Handling data URIs', () => {
		describe('dataUris.total', () => {
			it('should be counted correctly', () => {
				expect(report.dataUris.total).toBe(2);
			});
		});

		describe('dataUris.totalByteLength', () => {
			it('should be counted correctly', () => {
				expect(report.dataUris.totalByteLength).toBe(189);
			});
		});

		describe('dataUris.usage', () => {
			it('should be counted correctly', () => {
				expect(report.dataUris.usage).toEqual({
					'data:image/png;base64,TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0': 1,
					'data:image/jpeg;base64,aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1': 1,
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

		describe('vendorPrefixes.usage', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes.usage).toEqual({
					'-webkit-': 1,
					'-moz-': 1,
					'-ms-': 1,
					'-o-': 1,
				});
			});
		});
	});
});
