import { getEmptyReport } from '../../../common/getEmptyReport';
import { parseCss } from '../../../common/parseCss';
import { handlePerformanceHacks } from '.';

describe('Module: handlePerformanceHacks', () => {
	const src = `
		.selector {
			-webkit-transform: rotateZ(360deg);
			-moz-transform: rotateZ(360deg);
			-ms-transform: rotateZ(360deg);
			transform: rotateZ(360deg);
		}

		.selector {
			-webkit-transform: rotateZ(400grad);
			-moz-transform: rotateZ(400grad);
			-ms-transform: rotateZ(400grad);
			transform: rotateZ(400grad);
		}
		.selector {
			-webkit-transform: rotateZ(1turn);
			-moz-transform: rotateZ(1turn);
			-ms-transform: rotateZ(1turn);
			transform: rotateZ(1turn);
		}

		.selector {
			-webkit-transform: rotateZ(6.2832rad);
			-moz-transform: rotateZ(6.2832rad);
			-ms-transform: rotateZ(6.2832rad);
			transform: rotateZ(6.2832rad);
		}

		.selector {
			-webkit-backface-visibility: hidden;
			-webkit-perspective: 1000;
			-webkit-transform: translate3d(0,0,0);
			-moz-transform: translate3d(0,0,0);
			-ms-transform: translate3d(0,0,0);
			transform: translate3d(0,0,0);
		}

		.selector {
			-webkit-transform: translateZ(0);
		}

		.selector {
			will-change: transform;
		}

		.selector {
			will-change: left, top;
		}

		.selector {
			contain: none;
			contain: strict;
			contain: content;
			contain: size;
			contain: layout;
			contain: style;
			contain: paint;
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = getEmptyReport();

		cssRoot.walkDecls((decl) => {
			handlePerformanceHacks(decl, report);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('properties.performanceHacks', () => {
		it('should be counted correctly', () => {
			expect(report.properties.performanceHacks).toStrictEqual({
				'-webkit-transform: rotateZ(360deg)': 1,
				'-moz-transform: rotateZ(360deg)': 1,
				'-ms-transform: rotateZ(360deg)': 1,
				'transform: rotateZ(360deg)': 1,
				'-webkit-transform: rotateZ(400grad)': 1,
				'-moz-transform: rotateZ(400grad)': 1,
				'-ms-transform: rotateZ(400grad)': 1,
				'transform: rotateZ(400grad)': 1,
				'-webkit-transform: rotateZ(1turn)': 1,
				'-moz-transform: rotateZ(1turn)': 1,
				'-ms-transform: rotateZ(1turn)': 1,
				'transform: rotateZ(1turn)': 1,
				'-webkit-transform: rotateZ(6.2832rad)': 1,
				'-moz-transform: rotateZ(6.2832rad)': 1,
				'-ms-transform: rotateZ(6.2832rad)': 1,
				'transform: rotateZ(6.2832rad)': 1,
				'-webkit-transform: translate3d(0,0,0)': 1,
				'-moz-transform: translate3d(0,0,0)': 1,
				'-ms-transform: translate3d(0,0,0)': 1,
				'transform: translate3d(0,0,0)': 1,
				'-webkit-transform: translateZ(0)': 1,
				'will-change: left, top': 1,
				'will-change: transform': 1,
				'contain: strict': 1,
				'contain: content': 1,
				'contain: size': 1,
				'contain: layout': 1,
				'contain: style': 1,
				'contain: paint': 1,
			});
		});
	});
});
