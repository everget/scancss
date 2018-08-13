import { cssUnitsThatAllowZeroWithoutUnit } from '../../constants/cssUnitsThatAllowZeroWithoutUnit';
import { reNumberWithCssUnit } from '../../constants/reNumberWithCssUnit';
import { reCssUrlFunctionWithArg } from '../../constants/reCssUrlFunctionWithArg';
import { countUsage } from '../../calculators/countUsage';

const reAllowedLeadingSymbols = /(^|[(,\s])\s*/g;
const reNumberWithCssUnitWithAllowedLeadingSymbols = new RegExp(
	reAllowedLeadingSymbols.source + reNumberWithCssUnit.source,
	'g'
);

const excludedUnitlessProps = [
	'animation-name',
	'background-image',
	'content',
	'font-family',
];

export function handleUnits(decl, report, options) {
	if (excludedUnitlessProps.includes(decl.prop) && options.properties) {
		report.properties.unitless++;
		return;
	}

	/** Need to prevent units matching from data URIs in `url` function */
	const safedDeclValue = decl.prop === 'background' && reCssUrlFunctionWithArg.test(decl.value)
		? decl.value.replace(reCssUrlFunctionWithArg, '')
		: decl.value;

	if (reNumberWithCssUnitWithAllowedLeadingSymbols.test(safedDeclValue)) {
		safedDeclValue
			.match(reNumberWithCssUnitWithAllowedLeadingSymbols)
			/* eslint-disable-next-line arrow-body-style */
			.map((match) => {
				return match
					.replace(reAllowedLeadingSymbols, '')
					.replace(/\(/g, '')
					.replace(/,/g, '');
			})
			.forEach((match) => {
				report.units.total++;

				/** Count negative margins */
				if (
					decl.prop.startsWith('margin') &&
					match.startsWith('-') &&
					options.properties
				) {
					report.properties.negativeMargins++;
				}

				/** Count excessive units, i.e. `0px` */
				if (
					parseFloat(match) === 0 &&
					cssUnitsThatAllowZeroWithoutUnit.some((unit) => match.endsWith(unit))
				) {
					report.units.excessive.total++;
					countUsage(match, report.units.excessive.usage);
				}

				const unit = match.replace(/[-.0-9]+/g, '');
				countUsage(unit, report.units.usage);
			});
	} else if (options.properties) {
		report.properties.unitless++;
	}
}
