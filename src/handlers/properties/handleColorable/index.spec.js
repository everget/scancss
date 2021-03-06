import { getEmptyReport } from '../../../common/getEmptyReport';
import { parseCss } from '../../../common/parseCss';
import { handleColorable } from '.';

describe('Module: handleColorable', () => {
	const options = {
		colors: true,
		backgroundColors: true,
		allColors: true,
	};

	const src = `
		.selector {
			outline: 1px solid #fe8;
			outline-color: #fe8;
			border: 1px solid #fe8;
			border-top-color: #fe8;
			border-right-color: #fe8;
			border-bottom-color: #fe8;
			border-left-color: #fe8;
			box-shadow: 1px 2px 3px #fe8,
						4px 5px 6px #fe8;
			text-shadow: 1px 1px 2px #fe8;
			fill: #fe8;
			stroke: #fe8;
			background: #fe8;
			background-color: #fe8;
			color: #fe8;
		}

		.selector {
			outline: 1px solid #eeeeee;
			outline-color: #eeeeee;
			border: 1px solid #eeeeee;
			border-top-color: #eeeeee;
			border-right-color: #eeeeee;
			border-bottom-color: #eeeeee;
			border-left-color: #eeeeee;
			box-shadow: 1px 2px 3px #eeeeee,
						4px 5px 6px #eeeeee;
			text-shadow: 1px 1px 2px #eeeeee;
			fill: #eeeeee;
			stroke: #eeeeee;
			background: #eeeeee;
			background-color: #eeeeee;
			color: #eeeeee;
		}

		.selector {
			outline: 1px solid #ffff;
			outline-color: #ffff;
			border: 1px solid #ffff;
			border-top-color: #ffff;
			border-right-color: #ffff;
			border-bottom-color: #ffff;
			border-left-color: #ffff;
			box-shadow: 1px 2px 3px #ffff,
						4px 5px 6px #ffff;
			text-shadow: 1px 1px 2px #ffff;
			fill: #ffff;
			stroke: #ffff;
			background: #ffff;
			background-color: #ffff;
			color: #ffff;
		}

		.selector {
			outline: 1px solid #11223344;
			outline-color: #11223344;
			border: 1px solid #11223344;
			border-top-color: #11223344;
			border-right-color: #11223344;
			border-bottom-color: #11223344;
			border-left-color: #11223344;
			box-shadow: 1px 2px 3px #11223344,
						4px 5px 6px #11223344;
			text-shadow: 1px 1px 2px #11223344;
			fill: #11223344;
			stroke: #11223344;
			background: #11223344;
			background-color: #11223344;
			color: #11223344;
		}

		.selector {
			outline: 1px solid currentColor;
			outline-color: currentColor;
			border: 1px solid currentColor;
			border-top-color: currentColor;
			border-right-color: currentColor;
			border-bottom-color: currentColor;
			border-left-color: currentColor;
			box-shadow: 1px 2px 3px currentColor,
						4px 5px 6px currentColor;
			text-shadow: 1px 1px 2px currentColor;
			fill: currentColor;
			stroke: currentColor;
			background: currentColor;
			background-color: currentColor;
			color: currentColor;
		}

		.selector {
			outline: 1px solid transparent;
			outline-color: transparent;
			border: 1px solid transparent;
			border-top-color: transparent;
			border-right-color: transparent;
			border-bottom-color: transparent;
			border-left-color: transparent;
			box-shadow: 1px 2px 3px transparent,
						4px 5px 6px transparent;
			text-shadow: 1px 1px 2px transparent;
			fill: transparent;
			stroke: transparent;
			background: transparent;
			background-color: transparent;
			color: transparent;
		}

		.selector {
			outline: 1px solid chartreuse;
			outline-color: cornsilk;
			border: 1px solid black;
			border-top-color: crimson;
			border-right-color: red;
			border-bottom-color: white;
			border-left-color: honeydew;
			box-shadow: 1px 2px 3px indianred,
						4px 5px 6px khaki;
			text-shadow: 1px 1px 2px ivory;
			fill: indigo;
			stroke: hotpink;
			background: lightyellow;
			background-color: firebrick;
			color: rebeccapurple;
		}

		.selector {
			outline: 1px solid rgb(1, 2, 3);
			outline-color: rgb(1, 2, 3);
			border: 1px solid rgb(1, 2, 3);
			border-top-color: rgb(1, 2, 3);
			border-right-color: rgb(1, 2, 3);
			border-bottom-color: rgb(1, 2, 3);
			border-left-color: rgb(1, 2, 3);
			box-shadow: 1px 2px 3px rgb(1, 2, 3),
						4px 5px 6px rgb(1, 2, 3);
			text-shadow: 1px 1px 2px rgb(1, 2, 3);
			fill: rgb(1, 2, 3);
			stroke: rgb(1, 2, 3);
			background: rgb(1, 2, 3);
			background-color: rgb(1, 2, 3);
			color: rgb(1, 2, 3);
		}

		.selector {
			outline: 1px solid rgba(1, 2, 3, 0.4);
			outline-color: rgba(1, 2, 3, 0.4);
			border: 1px solid rgba(1, 2, 3, 0.4);
			border-top-color: rgba(1, 2, 3, 0.4);
			border-right-color: rgba(1, 2, 3, 0.4);
			border-bottom-color: rgba(1, 2, 3, 0.4);
			border-left-color: rgba(1, 2, 3, 0.4);
			box-shadow: 1px 2px 3px rgba(1, 2, 3, 0.4),
						4px 5px 6px rgba(1, 2, 3, 0.4);
			text-shadow: 1px 1px 2px rgba(1, 2, 3, 0.4);
			fill: rgba(1, 2, 3, 0.4);
			stroke: rgba(1, 2, 3, 0.4);
			background: rgba(1, 2, 3, 0.4);
			background-color: rgba(1, 2, 3, 0.4);
			color: rgba(1, 2, 3, 0.4);
		}

		.selector {
			outline: 1px solid hsl(1deg, 2%, 3%);
			outline-color: hsl(1deg, 2%, 3%);
			border: 1px solid hsl(1deg, 2%, 3%);
			border-top-color: hsl(1deg, 2%, 3%);
			border-right-color: hsl(1deg, 2%, 3%);
			border-bottom-color: hsl(1deg, 2%, 3%);
			border-left-color: hsl(1deg, 2%, 3%);
			box-shadow: 1px 2px 3px hsl(1deg, 2%, 3%),
						4px 5px 6px hsl(1deg, 2%, 3%);
			text-shadow: 1px 1px 2px hsl(1deg, 2%, 3%);
			fill: hsl(1deg, 2%, 3%);
			stroke: hsl(1deg, 2%, 3%);
			background: hsl(1deg, 2%, 3%);
			background-color: hsl(1deg, 2%, 3%);
			color: hsl(1deg, 2%, 3%);
		}

		.selector {
			outline: 1px solid hsla(1deg, 2%, 3%, 0.4);
			outline-color: hsla(1deg, 2%, 3%, 0.4);
			border: 1px solid hsla(1deg, 2%, 3%, 0.4);
			border-top-color: hsla(1deg, 2%, 3%, 0.4);
			border-right-color: hsla(1deg, 2%, 3%, 0.4);
			border-bottom-color: hsla(1deg, 2%, 3%, 0.4);
			border-left-color: hsla(1deg, 2%, 3%, 0.4);
			box-shadow: 1px 2px 3px hsla(1deg, 2%, 3%, 0.4),
						4px 5px 6px hsla(1deg, 2%, 3%, 0.4);
			text-shadow: 1px 1px 2px hsla(1deg, 2%, 3%, 0.4);
			fill: hsla(1deg, 2%, 3%, 0.4);
			stroke: hsla(1deg, 2%, 3%, 0.4);
			background: hsla(1deg, 2%, 3%, 0.4);
			background-color: hsla(1deg, 2%, 3%, 0.4);
			color: hsla(1deg, 2%, 3%, 0.4);
		}

		.selector {
			outline: 1px solid hwb(1deg, 2%, 3%, 0.4);
			outline-color: hwb(1deg, 2%, 3%, 0.4);
			border: 1px solid hwb(1deg, 2%, 3%, 0.4);
			border-top-color: hwb(1deg, 2%, 3%, 0.4);
			border-right-color: hwb(1deg, 2%, 3%, 0.4);
			border-bottom-color: hwb(1deg, 2%, 3%, 0.4);
			border-left-color: hwb(1deg, 2%, 3%, 0.4);
			box-shadow: 1px 2px 3px hwb(1deg, 2%, 3%, 0.4),
						4px 5px 6px hwb(1deg, 2%, 3%, 0.4);
			text-shadow: 1px 1px 2px hwb(1deg, 2%, 3%, 0.4);
			fill: hwb(1deg, 2%, 3%, 0.4);
			stroke: hwb(1deg, 2%, 3%, 0.4);
			background: hwb(1deg, 2%, 3%, 0.4);
			background-color: hwb(1deg, 2%, 3%, 0.4);
			color: hwb(1deg, 2%, 3%, 0.4);
		}

		.selector {
			outline: 1px solid ActiveCaption;
			outline-color: AppWorkspace;
			border: 1px solid Background;
			border-top-color: ButtonFace;
			border-right-color: ButtonHighlight;
			border-bottom-color: ButtonShadow;
			border-left-color: ButtonText;
			box-shadow: 1px 2px 3px CaptionText,
						4px 5px 6px GrayText;
			text-shadow: 1px 1px 2px Highlight;
			fill: HighlightText;
			stroke: InactiveBorder;
			background: InactiveCaption;
			background-color: InactiveCaptionText;
			color: InfoBackground;
		}

		.selector {
			background-image: linear-gradient(90deg, #fff 0, #445566);
			background-image: linear-gradient(90deg, transparent 0, #445566);
			background-image: repeating-linear-gradient(90deg, rgb(37, 39, 51) 0, rgba(37, 39, 51, .99) 85%, #445566);
			background-image: radial-gradient(circle, #fff 100%, #000 0);
			background-image: repeating-radial-gradient(circle at 4% -18%, #445566, #445566 47%, #fff);
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = getEmptyReport();

		cssRoot.walkDecls((decl) => {
			handleColorable(decl, report, options);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('Handling all colors', () => {
		describe('allColors.total', () => {
			it('should be counted correctly', () => {
				expect(report.allColors.total).toBe(207);
			});
		});

		describe('allColors.currentColorKeyword', () => {
			it('should be counted correctly', () => {
				expect(report.allColors.currentColorKeyword).toBe(15);
			});
		});

		describe('allColors.transparentKeyword', () => {
			it('should be counted correctly', () => {
				expect(report.allColors.transparentKeyword).toBe(16);
			});
		});

		describe('allColors.models', () => {
			it('should be counted correctly', () => {
				expect(report.allColors.models).toStrictEqual({
					hex: 39,
					hexa: 30,
					rgb: 16,
					rgba: 16,
					hsl: 15,
					hsla: 15,
					hwb: 15,
				});
			});
		});

		describe('allColors.named', () => {
			it('should be counted correctly', () => {
				expect(report.allColors.named).toStrictEqual({
					chartreuse: 1,
					cornsilk: 1,
					black: 1,
					crimson: 1,
					red: 1,
					white: 1,
					honeydew: 1,
					indianred: 1,
					khaki: 1,
					ivory: 1,
					indigo: 1,
					hotpink: 1,
					lightyellow: 1,
					firebrick: 1,
					rebeccapurple: 1,
				});
			});
		});

		describe('allColors.system', () => {
			it('should be counted correctly', () => {
				expect(report.allColors.system).toStrictEqual({
					activecaption: 1,
					appworkspace: 1,
					background: 1,
					buttonface: 1,
					buttonhighlight: 1,
					buttonshadow: 1,
					buttontext: 1,
					captiontext: 1,
					graytext: 1,
					highlight: 1,
					highlighttext: 1,
					inactiveborder: 1,
					inactivecaption: 1,
					inactivecaptiontext: 1,
					infobackground: 1,
				});
			});
		});

		describe('allColors.usage', () => {
			it('should be counted correctly', () => {
				expect(report.allColors.usage).toStrictEqual({
					'#ffee88': 15,
					'#eeeeee': 15,
					'#ffffffff': 15,
					'#11223344': 15,
					'#ffffff': 3,
					'#445566': 5,
					'#000000': 1,
					currentColor: 15,
					transparent: 16,
					chartreuse: 1,
					cornsilk: 1,
					black: 1,
					crimson: 1,
					red: 1,
					white: 1,
					honeydew: 1,
					indianred: 1,
					khaki: 1,
					ivory: 1,
					indigo: 1,
					hotpink: 1,
					lightyellow: 1,
					firebrick: 1,
					rebeccapurple: 1,
					'rgb(1,2,3)': 15,
					'rgb(37,39,51)': 1,
					'rgba(1,2,3,.4)': 15,
					'rgba(37,39,51,.99)': 1,
					'hsl(1deg,2%,3%)': 15,
					'hsla(1deg,2%,3%,.4)': 15,
					'hwb(1deg,2%,3%,.4)': 15,
					activecaption: 1,
					appworkspace: 1,
					background: 1,
					buttonface: 1,
					buttonhighlight: 1,
					buttonshadow: 1,
					buttontext: 1,
					captiontext: 1,
					graytext: 1,
					highlight: 1,
					highlighttext: 1,
					inactiveborder: 1,
					inactivecaption: 1,
					inactivecaptiontext: 1,
					infobackground: 1,
				});
			});
		});
	});

	describe('Handling non-background colors', () => {
		describe('colors.total', () => {
			it('should be counted correctly', () => {
				expect(report.colors.total).toBe(169);
			});
		});

		describe('colors.currentColorKeyword', () => {
			it('should be counted correctly', () => {
				expect(report.colors.currentColorKeyword).toBe(13);
			});
		});

		describe('colors.transparentKeyword', () => {
			it('should be counted correctly', () => {
				expect(report.colors.transparentKeyword).toBe(13);
			});
		});

		describe('colors.models', () => {
			it('should be counted correctly', () => {
				expect(report.colors.models).toStrictEqual({
					hex: 26,
					hexa: 26,
					rgb: 13,
					rgba: 13,
					hsl: 13,
					hsla: 13,
					hwb: 13,
				});
			});
		});

		describe('colors.named', () => {
			it('should be counted correctly', () => {
				expect(report.colors.named).toStrictEqual({
					chartreuse: 1,
					cornsilk: 1,
					crimson: 1,
					black: 1,
					rebeccapurple: 1,
					red: 1,
					white: 1,
					honeydew: 1,
					indianred: 1,
					khaki: 1,
					ivory: 1,
					indigo: 1,
					hotpink: 1,
				});
			});
		});

		describe('colors.system', () => {
			it('should be counted correctly', () => {
				expect(report.colors.system).toStrictEqual({
					activecaption: 1,
					appworkspace: 1,
					background: 1,
					buttonface: 1,
					buttonhighlight: 1,
					buttonshadow: 1,
					buttontext: 1,
					captiontext: 1,
					graytext: 1,
					highlight: 1,
					highlighttext: 1,
					inactiveborder: 1,
					infobackground: 1,
				});
			});
		});

		describe('colors.usage', () => {
			it('should be counted correctly', () => {
				expect(report.colors.usage).toStrictEqual({
					'#ffee88': 13,
					'#eeeeee': 13,
					'#ffffffff': 13,
					'#11223344': 13,
					currentColor: 13,
					transparent: 13,
					chartreuse: 1,
					cornsilk: 1,
					black: 1,
					crimson: 1,
					red: 1,
					white: 1,
					honeydew: 1,
					indianred: 1,
					khaki: 1,
					ivory: 1,
					indigo: 1,
					hotpink: 1,
					rebeccapurple: 1,
					'rgb(1,2,3)': 13,
					'rgba(1,2,3,.4)': 13,
					'hsl(1deg,2%,3%)': 13,
					'hsla(1deg,2%,3%,.4)': 13,
					'hwb(1deg,2%,3%,.4)': 13,
					activecaption: 1,
					appworkspace: 1,
					background: 1,
					buttonface: 1,
					buttonhighlight: 1,
					buttonshadow: 1,
					buttontext: 1,
					captiontext: 1,
					graytext: 1,
					highlight: 1,
					highlighttext: 1,
					inactiveborder: 1,
					infobackground: 1,
				});
			});
		});
	});

	describe('Handling background colors', () => {
		describe('backgroundColors.total', () => {
			it('should be counted correctly', () => {
				expect(report.backgroundColors.total).toBe(38);
			});
		});

		describe('backgroundColors.currentColorKeyword', () => {
			it('should be counted correctly', () => {
				expect(report.backgroundColors.currentColorKeyword).toBe(2);
			});
		});

		describe('backgroundColors.transparentKeyword', () => {
			it('should be counted correctly', () => {
				expect(report.backgroundColors.transparentKeyword).toBe(3);
			});
		});

		describe('backgroundColors.models', () => {
			it('should be counted correctly', () => {
				expect(report.backgroundColors.models).toStrictEqual({
					hex: 13,
					hexa: 4,
					rgb: 3,
					rgba: 3,
					hsl: 2,
					hsla: 2,
					hwb: 2,
				});
			});
		});

		describe('backgroundColors.named', () => {
			it('should be counted correctly', () => {
				expect(report.backgroundColors.named).toStrictEqual({
					lightyellow: 1,
					firebrick: 1,
				});
			});
		});

		describe('backgroundColors.system', () => {
			it('should be counted correctly', () => {
				expect(report.backgroundColors.system).toStrictEqual({
					inactivecaption: 1,
					inactivecaptiontext: 1,
				});
			});
		});

		describe('backgroundColors.usage', () => {
			it('should be counted correctly', () => {
				expect(report.backgroundColors.usage).toStrictEqual({
					'#ffee88': 2,
					'#eeeeee': 2,
					'#ffffffff': 2,
					'#11223344': 2,
					'#ffffff': 3,
					'#445566': 5,
					'#000000': 1,
					currentColor: 2,
					transparent: 3,
					lightyellow: 1,
					firebrick: 1,
					'rgb(1,2,3)': 2,
					'rgb(37,39,51)': 1,
					'rgba(1,2,3,.4)': 2,
					'rgba(37,39,51,.99)': 1,
					'hsl(1deg,2%,3%)': 2,
					'hsla(1deg,2%,3%,.4)': 2,
					'hwb(1deg,2%,3%,.4)': 2,
					inactivecaption: 1,
					inactivecaptiontext: 1,
				});
			});
		});
	});
});
