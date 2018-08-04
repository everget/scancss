import { cssUnits } from '../cssUnits';
import { reCssValueWithUnit } from '.';

describe('Module: reCssValueWithUnit', () => {
	describe('Positives', () => {
		cssUnits
			.map((unit) => 100 + unit)
			.forEach((valueWithUnit) => {
				it(`should match integer value ${valueWithUnit} with CSS unit`, () => {
					expect(valueWithUnit.match(reCssValueWithUnit)[0]).toBe(valueWithUnit);
				});
			});

		cssUnits
			.reduce((acc, unit) => {
				acc.push(12.34 + unit);
				acc.push(0.1 + unit);
				acc.push(0.01 + unit);
				acc.push('.1' + unit);
				acc.push('.11' + unit);
				acc.push('.50000' + unit);
				return acc;
			}, [])
			.forEach((valueWithUnit) => {
				it(`should match decimal value ${valueWithUnit} with CSS unit`, () => {
					expect(valueWithUnit.match(reCssValueWithUnit)[0]).toBe(valueWithUnit);
				});
			});
	});

	describe('Negatives', () => {
		cssUnits
			.reduce((acc, unit) => {
				acc.push('0.15 ' + unit);
				acc.push('11.' + unit);
				acc.push('1.' + unit);
				return acc;
			}, [])
			.forEach((valueWithUnit) => {
				it(`should not match incorrect value ${valueWithUnit} with CSS unit`, () => {
					expect(valueWithUnit.match(reCssValueWithUnit)).toBe(null);
				});
			});
	});
});
