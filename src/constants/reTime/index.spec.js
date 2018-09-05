import { reTime } from '.';

describe('Module: reTime', () => {
	describe('Positives', () => {
		const timeStrings = [
			'12',
			'300',
			'0.0',
			'+0.0',
			'-0.0',
			'0.2',
			'0.00000000754',
			'4.01',
			'4321.768',
			'.60',
			'6.720000000',
			'-456.8',
			'-1.233456',
			'-53000',
			'10e3',
			'1.1e6',
			'-3.4e-2',
			'1.233456',
			'123345.6e-7',
			'-123345.6e-7',
			'-123345.6e+7',
			'6.022E23',
			'6.022e23',
		];

		timeStrings
			.reduce(
				(acc, value) => {
					acc.push(
						value + 'ms',
						value + 's'
					);

					return acc;
				},
				[]
			)
			.forEach((value) => {
				it(`should match ${value}`, () => {
					expect(value.match(reTime)[0]).toBe(value);
				});
			});
	});

	describe('Negatives', () => {
		const notTimeStrings = [
			'1.ms',
			'12.ms',
			'+-12ms',
			'+-12.2s',
			'+---12s',
			'12.1.1s',
			'_5s',
			'\\35s',
			'\\4E94s',
			'fooms',
			'bars',
			'bazs',
		];

		notTimeStrings.forEach((value) => {
			it(`should not match ${value}`, () => {
				expect(value.match(reTime)).toBe(null);
			});
		});
	});
});
