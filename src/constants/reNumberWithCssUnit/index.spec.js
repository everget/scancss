import { cssUnits } from '../cssUnits';
import { reNumberWithCssUnit } from '.';

describe('Module: reNumberWithCssUnit', () => {
	describe('Positives', () => {
		describe('Matching integer numbers with units', () => {
			cssUnits
				.map((unit) => 100 + unit)
				.forEach((valueWithUnit) => {
					it(`should match integer value with CSS unit ${valueWithUnit}`, () => {
						expect(valueWithUnit.match(reNumberWithCssUnit)[0]).toBe(valueWithUnit);
					});
				});
		});

		describe('Matching decimal numbers with units', () => {
			cssUnits
				.reduce((acc, unit) => {
					acc.push(
						12.34 + unit,
						0.1 + unit,
						0.01 + unit,
						'.1' + unit,
						'.11' + unit,
						'.50000' + unit
					);

					return acc;
				}, [])
				.forEach((valueWithUnit) => {
					it(`should match decimal value with CSS unit ${valueWithUnit}`, () => {
						expect(valueWithUnit.match(reNumberWithCssUnit)[0]).toBe(valueWithUnit);
					});
				});
		});
	});

	describe('Negatives', () => {
		cssUnits
			.reduce((acc, unit) => {
				acc.push(
					'0.15 ' + unit,
					'11.' + unit,
					'1.' + unit
				);

				return acc;
			}, [])
			.forEach((valueWithUnit) => {
				it(`should not match incorrect value with CSS unit ${valueWithUnit}`, () => {
					expect(valueWithUnit.match(reNumberWithCssUnit)).toBe(null);
				});
			});
	});
});
