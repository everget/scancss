import { default as parser } from 'postcss-values-parser';
import { isSafeAst } from '../../../predicates/isSafeAst';
import { countUsage } from '../../../calculators/countUsage';

export function handleAtRuleFunctions(value, report) {
	try {
		const ast = parser(value).parse();

		if (isSafeAst(ast)) {
			ast.nodes[0]
				.nodes
				.forEach((node) => {
					const nodeValue = node.value.toLowerCase();

					if (
						node.type === 'func' &&
						(nodeValue !== 'local' && nodeValue !== 'format')
					) {
						report.functions.total++;
						countUsage(nodeValue, report.functions.usage);
					}
				});
		}
	} catch (err) {
		/* eslint-disable-next-line no-console */
		console.log(`'postcss-values-parser' module error\n${err}`);
	}
}
