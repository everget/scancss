import { default as parser } from 'postcss-values-parser';

import { countUsage } from '../../../calculators/countUsage';
import { isSafeAst } from '../../../predicates/isSafeAst';

const reTranslate3dHack = /translate3d\(\s*0\s*,\s*0\s*,\s*0\s*\)/i;
const reTranslateZHack = /translateZ\(\s*0\s*\)/i;
const reRotateZHack = /rotateZ\(\s*(360deg|400grad|1turn|6\.2832rad)\s*\)/i;

function walkNodes(nodes, decl, report) {
	nodes.forEach((node) => {
		/* istanbul ignore else */
		if (node.type === 'func') {
			const wholeFunc = String(node);
			const wholeDecl = String(decl);

			if (reTranslate3dHack.test(wholeFunc)) {
				countUsage(wholeDecl, report.properties.performanceHacks);
			}

			if (reTranslateZHack.test(wholeFunc)) {
				countUsage(wholeDecl, report.properties.performanceHacks);
			}

			if (reRotateZHack.test(wholeFunc)) {
				countUsage(wholeDecl, report.properties.performanceHacks);
			}
		}
	});
}

export function handlePerformanceHacks(decl, report) {
	if (decl.prop.endsWith('transform')) {
		try {
			const ast = parser(decl.value).parse();

			/* istanbul ignore else */
			if (isSafeAst(ast)) {
				walkNodes(ast.nodes[0].nodes, decl, report);
			}
		} catch (err) {
			/* istanbul ignore next */
			/* eslint-disable-next-line no-console */
			console.log(`'postcss-values-parser' module error\n${err}`);
		}
	}

	if (decl.prop === 'will-change') {
		countUsage(String(decl), report.properties.performanceHacks);
	} else if (decl.prop === 'contain' && decl.value.trim() !== 'none') {
		countUsage(String(decl), report.properties.performanceHacks);
	}
}
