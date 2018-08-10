import { cssUnitsThatAllowZeroWithoutUnit } from '../../constants/cssUnitsThatAllowZeroWithoutUnit';
import { reCssValueWithUnit } from '../../constants/reCssValueWithUnit';
import { reUrlFunctionWithArg } from '../../constants/reUrlFunctionWithArg';
import { countUsage } from '../../calculators/countUsage';

const reAllowedLeadingSymbols = /(^|[(,\s])\s*/g;
const reCssValueWithUnitWithAllowedLeadingSymbols = new RegExp(
	reAllowedLeadingSymbols.source + reCssValueWithUnit.source,
	'g'
);

const excludedUnitlessProps = [
	'animation-name',
	'background-image',
	'content',
	'font-family',
];

export function handleUnits(decl, report) {
	if (excludedUnitlessProps.includes(decl.prop)) {
		report.properties.unitless++;
		return;
	}

	/** Need to prevent units matching from data URIs in `url` function */
	const safedDeclValue = decl.prop === 'background' && reUrlFunctionWithArg.test(decl.value)
		? decl.value.replace(reUrlFunctionWithArg, '')
		: decl.value;

	if (reCssValueWithUnitWithAllowedLeadingSymbols.test(safedDeclValue)) {
		safedDeclValue
			.match(reCssValueWithUnitWithAllowedLeadingSymbols)
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
				if (decl.prop.startsWith('margin') && match.startsWith('-')) {
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
	} else {
		report.properties.unitless++;
	}
}
