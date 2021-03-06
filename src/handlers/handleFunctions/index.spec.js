import { getEmptyReport } from '../../common/getEmptyReport';
import { parseCss } from '../../common/parseCss';
import { handleFunctions } from '.';

describe('Module: handleFunctions', () => {
	const options = {
		transitionsAndAnimations: true,
		filters: true,
		gradients: true,
		dataUris: true,
	};

	const src = `
		.selector {
			right: calc(50% - 530px);
			width: calc(100% - 80px);
			height: calc(40% - 40px);
			background-color: var(--main-bg-color);
			color: rgb(255, 0, 215);
			transition-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
			transition: steps(4, end);
			transform: translateY(-150%) scale(.8);
			filter: blur(5px);
		}

		.selector {
			content: attr(data-tooltip);
			line-height: calc(1.3em + (1.5 - 1.3) * ((100vw - 21em)/(35 - 21)));
			shape-outside: inset(50px);
			background: hsl(140, 80%, 70%);
			transition-timing-function: cubic-bezier(0.0, 0.0, 1, 1);
			transition: frames(10);
			transform: translateY(-150%) scale(.8) rotate(180deg);
			filter: contrast(200%);
		}

		.selector {
			width: min(1 * 10vw, 2 / 50vw);
			height: max(1 * 10vw, 2 / 50vw);
			clip-path: inset(50px round 15px);
			background: repeating-radial-gradient(red, yellow 10%, green 15%);
			transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
			transition: steps(2);
			transform: scale(.8);
			filter: grayscale(80%);
		}

		.selector {
			content: url('data:image/png;base64,TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0');
			background: radial-gradient(red, green, blue);
			animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
			transition-timing-function: cubic-bezier(0.1, red, 1.0, green);
			transition: steps(-3, start);
			transform: rotate(180deg);
			filter: hue-rotate(90deg);
		}

		.selector {
			content: url(data:image/jpeg;base64,aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1);
			background-color: hsl(var(--hue), 90%, 52%);
			background-image: url('data:image/svg+xml,\
				<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25">\
					<rect x="50" width="50" height="50"/> \
					<rect y="50" width="50" height="50"/> \
				</svg>');
			animation-timing-function: cubic-bezier(0.3, 2.1);
			transition-timing-function: cubic-bezier(-1.9, 0.3, -0.2, 2.1);
			transition: frames(2.0);
			transform: translateY(-150%);
			filter: drop-shadow(16px 16px 20px red) invert(75%);
		}

		.selector {
			background-image: -webkit-linear-gradient(top, #2F2727, #1a82f7);
			background-image: -moz-linear-gradient(top, #2F2727, #1a82f7);
			background-image: -ms-linear-gradient(top, #2F2727, #1a82f7);
			background-image: -o-linear-gradient(top, #2F2727, #1a82f7);
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = getEmptyReport();

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
				expect(report.functions.total).toBe(49);
			});
		});

		describe('functions.unique', () => {
			it('should be counted correctly', () => {
				expect(report.functions.unique).toBe(0);
			});
		});

		describe('functions.prefixed', () => {
			it('should be counted correctly', () => {
				expect(report.functions.prefixed).toBe(4);
			});
		});

		describe('functions.usage', () => {
			it('should be counted correctly', () => {
				expect(report.functions.usage).toStrictEqual({
					'-moz-linear-gradient': 1,
					'-ms-linear-gradient': 1,
					'-o-linear-gradient': 1,
					'-webkit-linear-gradient': 1,
					attr: 1,
					blur: 1,
					calc: 4,
					contrast: 1,
					'cubic-bezier': 7,
					'drop-shadow': 1,
					grayscale: 1,
					hsl: 2,
					'hue-rotate': 1,
					inset: 2,
					invert: 1,
					max: 1,
					min: 1,
					'radial-gradient': 1,
					'repeating-radial-gradient': 1,
					rgb: 1,
					rotate: 2,
					scale: 3,
					translatey: 3,
					url: 3,
					var: 2,
					frames: 2,
					steps: 3,
				});
			});
		});
	});

	describe('Handling filters', () => {
		describe('filters.total', () => {
			it('should be counted correctly', () => {
				expect(report.filters.total).toBe(6);
			});
		});

		describe('filters.unique', () => {
			it('should be counted correctly', () => {
				expect(report.filters.unique).toBe(0);
			});
		});

		describe('filters.usage', () => {
			it('should be counted correctly', () => {
				expect(report.filters.usage).toStrictEqual({
					'invert(75%)': 1,
					'blur(5px)': 1,
					'contrast(200%)': 1,
					'drop-shadow(16px 16px 20px red)': 1,
					'grayscale(80%)': 1,
					'hue-rotate(90deg)': 1,
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
				expect(report.gradients.usage).toStrictEqual({
					'repeating-radial-gradient(red, yellow 10%, green 15%)': 1,
					'radial-gradient(red, green, blue)': 1,
					'-webkit-linear-gradient(top, #2F2727, #1a82f7)': 1,
					'-moz-linear-gradient(top, #2F2727, #1a82f7)': 1,
					'-ms-linear-gradient(top, #2F2727, #1a82f7)': 1,
					'-o-linear-gradient(top, #2F2727, #1a82f7)': 1,
				});
			});
		});
	});

	describe('Handling timing functions', () => {
		describe('transitions.timingFunctions', () => {
			it('should be counted correctly', () => {
				expect(report.transitions.timingFunctions).toStrictEqual({
					'cubic-bezier(0.1, 0.7, 1.0, 0.1)': 1,
					'cubic-bezier(0.0, 0.0, 1, 1)': 1,
					'cubic-bezier(0.25, 0.1, 0.25, 1)': 1,
					'cubic-bezier(0.1, red, 1.0, green)': 1,
					'cubic-bezier(-1.9, 0.3, -0.2, 2.1)': 1,
					'frames(10)': 1,
					'frames(2.0)': 1,
					'steps(4, end)': 1,
					'steps(2)': 1,
					'steps(-3, start)': 1,
				});
			});
		});

		describe('transitions.invalidTimingFunctions', () => {
			it('should be counted correctly', () => {
				expect(report.transitions.invalidTimingFunctions).toStrictEqual({
					'cubic-bezier(0.1, red, 1.0, green)': 1,
					'cubic-bezier(-1.9, 0.3, -0.2, 2.1)': 1,
					'frames(2.0)': 1,
					'steps(-3, start)': 1,
				});
			});
		});

		describe('animations.timingFunctions', () => {
			it('should be counted correctly', () => {
				expect(report.animations.timingFunctions).toStrictEqual({
					'cubic-bezier(0.42, 0, 1, 1)': 1,
					'cubic-bezier(0.3, 2.1)': 1,
				});
			});
		});

		describe('animations.invalidTimingFunctions', () => {
			it('should be counted correctly', () => {
				expect(report.animations.invalidTimingFunctions).toStrictEqual({
					'cubic-bezier(0.3, 2.1)': 1,
				});
			});
		});
	});

	describe('Handling data URIs', () => {
		describe('dataUris.total', () => {
			it('should be counted correctly', () => {
				expect(report.dataUris.total).toBe(3);
			});
		});

		describe('dataUris.length.total', () => {
			it('should be counted correctly', () => {
				expect(report.dataUris.length.total).toBe(372);
			});
		});

		describe('dataUris.length.average', () => {
			it('should be counted correctly', () => {
				expect(report.dataUris.length.average).toBe(0);
			});
		});

		describe('dataUris.length.longest', () => {
			it('should be counted correctly', () => {
				expect(report.dataUris.length.longest).toBe(183);
			});
		});

		describe('dataUris.length.longestDataUri', () => {
			it('should be counted correctly', () => {
				expect(report.dataUris.length.longestDataUri).toBe('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25"><rect x="50" width="50" height="50"/><rect y="50" width="50" height="50"/></svg>');
			});
		});

		describe('dataUris.usage', () => {
			it('should be counted correctly', () => {
				expect(report.dataUris.usage).toStrictEqual({
					'data:image/png;base64,TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0': 1,
					'data:image/jpeg;base64,aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1': 1,
					'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25"><rect x="50" width="50" height="50"/><rect y="50" width="50" height="50"/></svg>': 1,
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
				expect(report.vendorPrefixes.unknown.usage).toStrictEqual({});
			});
		});

		describe('vendorPrefixes.usage', () => {
			it('should be counted correctly', () => {
				expect(report.vendorPrefixes.usage).toStrictEqual({
					'-webkit-': 1,
					'-moz-': 1,
					'-ms-': 1,
					'-o-': 1,
				});
			});
		});
	});
});
