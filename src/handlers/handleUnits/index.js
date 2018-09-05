import { default as parser } from 'postcss-values-parser';

import { cssUnits } from '../../constants/cssUnits';
import { cssUnitsThatAllowZeroWithoutUnit } from '../../constants/cssUnitsThatAllowZeroWithoutUnit';
import { countUsage } from '../../calculators/countUsage';
import { isSafeAst } from '../../predicates/isSafeAst';

function walkNodes(nodes, decl, report, options) {
	nodes.forEach((node) => {
		if (node.type === 'number' && node.unit !== '') {
			const unit = node.unit.toLowerCase();
			const valueWithUnit = node.value + unit;

			if (cssUnits.includes(unit)) {
				report.units.total++;

				/** Count negative margins */
				if (
					decl.prop.startsWith('margin') &&
					node.value.startsWith('-') &&
					options.properties
				) {
					report.properties.negativeMargins++;
				}

				/** Count excessive units, i.e. `0px` */
				if (
					parseFloat(node.value) === 0 &&
					cssUnitsThatAllowZeroWithoutUnit.includes(unit)
				) {
					report.units.excessive.total++;
					countUsage(valueWithUnit, report.units.excessive.usage);
				}

				countUsage(unit, report.units.usage);
			}
		}

		if (node.type === 'func' && Array.isArray(node.nodes)) {
			walkNodes(node.nodes, decl, report, options);
		}
	});
}

export function handleUnits(decl, report, options) {
	const currentUnitsTotal = report.units.total;

	try {
		const ast = parser(decl.value).parse();

		if (isSafeAst(ast)) {
			walkNodes(ast.nodes[0].nodes, decl, report, options);
		}
	} catch (err) {
		/* eslint-disable-next-line no-console */
		console.log(`'postcss-values-parser' module error\n${err}`);
	}

	if (currentUnitsTotal === report.units.total && options.properties) {
		report.properties.unitless++;
	}
}
