import { getEmptyReport } from '../../common/getEmptyReport';
import { parseCss } from '../../common/parseCss';
import { handleUnits } from '.';

describe('Module: handleUnits', () => {
	const options = {
		properties: true,
	};

	let report;

	beforeEach(() => {
		report = getEmptyReport();
	});

	afterEach(() => {
		report = null;
	});

	describe('Counting units from declaration values', () => {
		const src = `
			.selector {
				top: 50%;
				margin-top: -0.4375em;
				border: 3px solid transparent;
				border-radius: 2px;
				border-right: 0px;
				border-top: 0px;
				width: 0.625em;
				height: 0.625em;
				transform: rotate(-45deg);
				transition: max-height 0.4s ease-in-out;
			}

			.selector {
				margin: -1px 0px 0px -6px;
				padding: 0.35em 0.75em 0.625em;
				width: 31.82752%;
				height: 20cm;
				font-size: 2rem;
				stroke: hsla(0,0%,100%,.8);
				transform: rotate(1turn);
				transition: background-color .35ms ease;
			}

			.selector {
				left: -3px;
				top: 0em;
				margin: 0px 5px 3px 0px;
				border-left: 3px solid #5cb888;
				padding: 7px 12px;
				width: 4in;
				height: 200mm;
				font-size: 13px;
				line-height: 16px;
				background-position: 50% 50%;
				background-size: 100% 10px;
				transform: translate(-50%, -50%) translate(-30px, -30px);
				transition-delay: 0.23333333s;
			}

			.selector {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr 1fr;
				grid-template-rows: 100px 200px 100px;
			}

			.selector {
				margin-left: calc(50% - 50vw);
				margin-right: calc(50% - 50vw);
				padding: 20vmin 10vmax;
				width: 100vh;
				max-width: 30em;
				height: calc(100vw * (9/16));
				max-height: calc(30em * (9/16));
				font-size: calc(16px + 1vh);
				line-height: calc(1.1em + 0.5vw);
			}

			.selector {
				width: 120pt;
				height: 12pc;
				font-size: 60ex;
				line-height: 60ch;
			}

			.selector {
				voice-pitch: 230Hz;
			}

			.selector {
				voice-pitch: -230Hz absolute;
			}
		`;

		const cssRoot = parseCss(src);

		beforeEach(() => {
			cssRoot.walkDecls((decl) => {
				handleUnits(decl, report, options);
			});
		});

		describe('units.total', () => {
			it('should be counted correctly', () => {
				expect(report.units.total).toBe(73);
			});
		});

		describe('units.unique', () => {
			it('should be counted correctly', () => {
				expect(report.units.unique).toBe(0);
			});
		});

		describe('units.usage', () => {
			it('should be counted correctly', () => {
				expect(report.units.usage).toStrictEqual({
					ch: 1,
					cm: 1,
					deg: 1,
					em: 10,
					ex: 1,
					fr: 4,
					Hz: 2,
					in: 1,
					mm: 1,
					ms: 1,
					pc: 1,
					pt: 1,
					px: 25,
					rem: 1,
					s: 2,
					turn: 1,
					vh: 2,
					vw: 4,
					vmax: 1,
					vmin: 1,
					'%': 11,
				});
			});
		});

		describe('units.excessive.total', () => {
			it('should be counted correctly', () => {
				expect(report.units.excessive.total).toBe(8);
			});
		});

		describe('units.excessive.unique', () => {
			it('should be counted correctly', () => {
				expect(report.units.excessive.unique).toBe(0);
			});
		});

		describe('units.excessive.usage', () => {
			it('should be counted correctly', () => {
				expect(report.units.excessive.usage).toStrictEqual({
					'0px': 6,
					'0em': 1,
					'0%': 1,
				});
			});
		});

		describe('properties.negativeMargins', () => {
			it('should be counted correctly', () => {
				expect(report.properties.negativeMargins).toBe(3);
			});
		});

		describe('properties.unitless', () => {
			it('should be counted correctly', () => {
				expect(report.properties.unitless).toBe(1);
			});
		});
	});

	describe('Counting from unitless declaration values', () => {
		const src = `
			.selector {
				margin: 0 0 0 0;
				border-radius: 0;
				border-right: 0;
				border-top: 0;
				padding: 0 0 0 0;
				width: 0;
				height: 0;
				font-size: 0;
				transform: rotate(0);
		`;

		const cssRoot = parseCss(src);

		beforeEach(() => {
			cssRoot.walkDecls((decl) => {
				handleUnits(decl, report, options);
			});
		});

		describe('units.total', () => {
			it('should be counted correctly', () => {
				expect(report.units.total).toBe(0);
			});
		});

		describe('units.usage', () => {
			it('should be counted correctly', () => {
				expect(report.units.usage).toStrictEqual({});
			});
		});

		describe('units.excessive.total', () => {
			it('should be counted correctly', () => {
				expect(report.units.excessive.total).toBe(0);
			});
		});

		describe('units.excessive.unique', () => {
			it('should be counted correctly', () => {
				expect(report.units.excessive.unique).toBe(0);
			});
		});

		describe('units.excessive.usage', () => {
			it('should be counted correctly', () => {
				expect(report.units.excessive.usage).toStrictEqual({});
			});
		});

		describe('properties.negativeMargins', () => {
			it('should be counted correctly', () => {
				expect(report.properties.negativeMargins).toBe(0);
			});
		});

		describe('properties.unitless', () => {
			it('should be counted correctly', () => {
				expect(report.properties.unitless).toBe(9);
			});
		});
	});

	describe('Counting from declaration values that contain unit-like parts', () => {
		const src = `
			.selector {
				content: url("data:image/gif;base64,F5pcPABA10vbMnLzf///yLA11pxAADAGC10degqAcF6kHzADs=");
				background-image: url(data:image/gif;base64,F5pcPABA10vbMnLzf///yLA11pxAADAGC10degqAcF6kHzADs=);
			}

			.selector {
				content: url("data:image/gif;base64,F5pcPABA10vbMnLzf///yLA11pxAADAGC10degqAcF6kHzADs=");
				background: url(data:image/gif;base64,F5pcPABA10vbMnLzf///yLA11pxAADAGC10degqAcF6kHzADs=) no-repeat #a953ae;
			}

			.selector {
				animation-name: spin-cw-1turn;
			}

			.selector {
				animation: ease-in 2 reverse both paused spin-cw-1turn;
			}

			.selector {
				animation: ease-in 2 reverse both paused slidein;
			}
		`;

		const cssRoot = parseCss(src);

		beforeEach(() => {
			cssRoot.walkDecls((decl) => {
				handleUnits(decl, report, options);
			});
		});

		describe('units.total', () => {
			it('should be counted correctly', () => {
				expect(report.units.total).toBe(0);
			});
		});

		describe('units.usage', () => {
			it('should be counted correctly', () => {
				expect(report.units.usage).toStrictEqual({});
			});
		});

		describe('units.excessive.total', () => {
			it('should be counted correctly', () => {
				expect(report.units.excessive.total).toBe(0);
			});
		});

		describe('units.excessive.unique', () => {
			it('should be counted correctly', () => {
				expect(report.units.excessive.unique).toBe(0);
			});
		});

		describe('units.excessive.usage', () => {
			it('should be counted correctly', () => {
				expect(report.units.excessive.usage).toStrictEqual({});
			});
		});

		describe('properties.negativeMargins', () => {
			it('should be counted correctly', () => {
				expect(report.properties.negativeMargins).toBe(0);
			});
		});

		describe('properties.unitless', () => {
			it('should be counted correctly', () => {
				expect(report.properties.unitless).toBe(7);
			});
		});
	});
});
