import { parseCss } from '../../converters/parseCss';
import { handlePerformanceHackProperties } from '.';

describe('Module: handlePerformanceHackProperties', () => {
	const src = `
		.selector {
			-webkit-transform: rotateZ(360deg);
		}

		.selector {
			-webkit-backface-visibility: hidden;
			-webkit-perspective: 1000;
			-webkit-transform: translate3d(0,0,0);
		}

		.selector {
			-webkit-transform: translateZ(0);
		}

		.selector {
			will-change: transform;
		}

		.selector {
			backface-visibility: hidden;
			perspective: 1000;
		}

		.selector {
			will-change: left, top;
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = {
			properties: {
				performanceHacks: {},
			}
		};

		cssRoot.walkDecls((decl) => {
			handlePerformanceHackProperties(decl, report);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('properties.performanceHacks', () => {
		it('should be counted correctly', () => {
			expect(report.properties.performanceHacks).toEqual({
				'rotateZ(360deg)': 1,
				'translate3d(0,0,0)': 1,
				'translateZ(0)': 1,
				'will-change': 2,
			});
		});
	});
});
