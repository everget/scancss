import { reCssFileName } from '.';

describe('Module: reCssFileName', () => {
	describe('Positives', () => {
		const cssFileNames = [
			'navigation.css',
			'printstyle.css',
			'bluish.css',
		];

		cssFileNames
			.forEach((name) => {
				it(`should match ${name}`, () => {
					expect(name.match(reCssFileName)[0]).toBe(name);
				});
			});

		describe('Matching from string', () => {
			const str = '     \"navigation.css\",    \'printstyle.css\' , bluish.css';
			const expected = ['\"navigation.css\"', '\'printstyle.css\'', 'bluish.css'];

			it('should match filenames from string', () => {
				expect(str.match(reCssFileName)).toStrictEqual(expected);
			});
		});
	});

	describe('Negatives', () => {
		const notCssFileNames = [
			'foo.js',
			'bar.html',
		];

		notCssFileNames.forEach((name) => {
			it(`should not match ${name}`, () => {
				expect(name.match(reCssFileName)).toBe(null);
			});
		});
	});
});
