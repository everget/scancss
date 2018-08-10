import { parseCss } from '../../converters/parseCss';
import { handleTransitionsAndAnimations } from '.';

describe('Module: handleTransitionsAndAnimations', () => {
	const src = `
		.selector {
			transition-property: transform;
			transition-duration: 1s;
			transition-timing-function: ease;
			transition-delay: 2s;
		}

		.selector {
			transition-property: top, right;
			transition-duration: 1s, 2s;
			transition-timing-function: inherit, ease-in;
			transition-delay: 3s, 4s;
		}

		.selector {
			transition-property: -webkit-transform;
			transition-duration: 1s;
			transition-timing-function: ease-out-quad;
			transition-delay: 2s;
		}

		.selector {
			transition: all 500ms ease;
		}

		.selector {
			transition: margin-right 1s ease 100ms, color 3s ease-out 4s;
		}

		.selector {
			transition: margin-left 1s ease-in-out 2s;
		}

		.selector {
			animation-name: none;
			animation-duration: 1s;
			animation-timing-function: ease;
			animation-delay: 2s;
			animation-iteration-count: 3;
		}

		.selector {
			animation-name: heart-bit;
			animation-duration: 1s;
			animation-timing-function: ease-out-back;
			animation-delay: 2s;
			animation-iteration-count: infinite;
		}

		.selector {
			animation: 1s ease-in 2s infinite reverse both paused fade-in;
		}

		.selector {
			animation: 3s ease-in 4s 5 reverse both paused slide-in;
		}
	`;

	const cssRoot = parseCss(src);

	let report;

	beforeEach(() => {
		report = {
			transitions: {
				properties: {},
				longestDuration: 0,
				shortestDuration: Number.MAX_SAFE_INTEGER,
				longestDelay: 0,
				shortestDelay: Number.MAX_SAFE_INTEGER,
				timingFunctions: {},
				invalidTimingFunctions: {},
			},
			animations: {
				total: 0,
				unique: 0,
				infinite: 0,
				longestDuration: 0,
				shortestDuration: Number.MAX_SAFE_INTEGER,
				longestDelay: 0,
				shortestDelay: Number.MAX_SAFE_INTEGER,
				usage: {},
				timingFunctions: {},
				invalidTimingFunctions: {},
			},
		};

		cssRoot.walkDecls((decl) => {
			handleTransitionsAndAnimations(decl, report);
		});
	});

	afterEach(() => {
		report = null;
	});

	describe('Handling transitions', () => {
		describe('transitions.properties', () => {
			it('should be counted correctly', () => {
				expect(report.transitions.properties).toEqual({
					all: 1,
					color: 1,
					'margin-left': 1,
					'margin-right': 1,
					right: 1,
					top: 1,
					transform: 1,
					'-webkit-transform': 1,
				});
			});
		});

		describe('transitions.longestDuration', () => {
			it('should be counted correctly', () => {
				expect(report.transitions.longestDuration).toBe(3);
			});
		});

		describe('transitions.shortestDuration', () => {
			it('should be counted correctly', () => {
				expect(report.transitions.shortestDuration).toBe(0.5);
			});
		});

		describe('transitions.longestDelay', () => {
			it('should be counted correctly', () => {
				expect(report.transitions.longestDelay).toBe(4);
			});
		});

		describe('transitions.shortestDelay', () => {
			it('should be counted correctly', () => {
				expect(report.transitions.shortestDelay).toBe(0.1);
			});
		});

		describe('transitions.timingFunctions', () => {
			it('should be counted correctly', () => {
				expect(report.transitions.timingFunctions).toEqual({
					ease: 3,
					'ease-in': 1,
					'ease-in-out': 1,
					'ease-out': 1,
					inherit: 1,
				});
			});
		});

		describe('transitions.invalidTimingFunctions', () => {
			it('should be counted correctly', () => {
				expect(report.transitions.invalidTimingFunctions).toEqual({
					'ease-out-quad': 1,
				});
			});
		});
	});

	describe('Handling animations', () => {
		describe('animations.total', () => {
			it('should be counted correctly', () => {
				expect(report.animations.total).toBe(4);
			});
		});

		describe('animations.unique', () => {
			it('should be counted correctly', () => {
				expect(report.animations.unique).toBe(0);
			});
		});

		describe('animations.infinite', () => {
			it('should be counted correctly', () => {
				expect(report.animations.infinite).toBe(2);
			});
		});

		describe('animations.longestDuration', () => {
			it('should be counted correctly', () => {
				expect(report.animations.longestDuration).toBe(3);
			});
		});

		describe('animations.shortestDuration', () => {
			it('should be counted correctly', () => {
				expect(report.animations.shortestDuration).toBe(1);
			});
		});

		describe('animations.longestDelay', () => {
			it('should be counted correctly', () => {
				expect(report.animations.longestDelay).toBe(4);
			});
		});

		describe('animations.shortestDelay', () => {
			it('should be counted correctly', () => {
				expect(report.animations.shortestDelay).toBe(2);
			});
		});

		describe('animations.usage', () => {
			it('should be counted correctly', () => {
				expect(report.animations.usage).toEqual({
					none: 1,
					'heart-bit': 1,
					'fade-in': 1,
					'slide-in': 1,
				});
			});
		});

		describe('animations.timingFunctions', () => {
			it('should be counted correctly', () => {
				expect(report.animations.timingFunctions).toEqual({
					ease: 1,
					'ease-in': 2,
				});
			});
		});

		describe('animations.invalidTimingFunctions', () => {
			it('should be counted correctly', () => {
				expect(report.animations.invalidTimingFunctions).toEqual({
					'ease-out-back': 1,
				});
			});
		});
	});
});
