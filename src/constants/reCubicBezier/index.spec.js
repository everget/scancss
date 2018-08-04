import { reCubicBezier } from '.';

describe('Module: reCubicBezier', () => {
	describe('Positives', () => {
		const cubicBeziers = [
			'cubic-bezier(0.47, 0, 0.745, 0.715)',
			'cubic-bezier(0.39, 0.575, 0.565, 1)',
			'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
			'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
			'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
			'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
			'cubic-bezier(0.215, 0.61, 0.355, 1)',
			'cubic-bezier(0.645, 0.045, 0.355, 1)',
			'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
			'cubic-bezier(0.165, 0.84, 0.44, 1)',
			'cubic-bezier(0.77, 0, 0.175, 1)',
			'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
			'cubic-bezier(0.23, 1, 0.32, 1)',
			'cubic-bezier(0.86, 0, 0.07, 1)',
			'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
			'cubic-bezier(0.19, 1, 0.22, 1)',
			'cubic-bezier(1, 0, 0, 1)',
			'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
			'cubic-bezier(0.075, 0.82, 0.165, 1)',
			'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
			'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
			'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			'cubic-bezier(0.1, red, 1.0, green)',
			'cubic-bezier(2.45, 0.6, 4, 0.1)',
			'cubic-bezier(0.3, 2.1)',
			'cubic-bezier(-1.9, 0.3, -0.2, 2.1)',
		];

		cubicBeziers
			.reduce((acc, func) => {
				acc.push(func);
				acc.push(func.replace(/0\./g, '.'));
				acc.push(func.replace(/\(/g, '(  ').replace(/\)/g, '  )'));
				acc.push(func.replace(/,/g, ' , '));
				acc.push(func.replace(/,/g, '  ,  '));
				return acc;
			}, [])
			.forEach((func) => {
				it(`should match ${func}`, () => {
					expect(func.match(reCubicBezier)[0]).toBe(func);
				});
			});
	});

	describe('Negatives', () => {
		const nonCubicBeziers = [
			'cheese(1,1,1,1)',
			'cubicbezier(0.47, 0, 0.745, 0.715)',
		];

		nonCubicBeziers.forEach((func) => {
			it(`should not match ${func}`, () => {
				expect(func.match(reCubicBezier)).toBe(null);
			});
		});
	});
});
