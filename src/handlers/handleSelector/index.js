import parser from 'postcss-selector-parser';

import { cssPseudoClasses } from '../../constants/cssPseudoClasses';
import { cssPseudoElements } from '../../constants/cssPseudoElements';
import { rePrefixedString } from '../../constants/rePrefixedString';
import { reLeadingColons } from '../../constants/reLeadingColons';
import { calculateSpecificity } from '../../calculators/calculateSpecificity';
import { compareSpecificities } from '../../calculators/compareSpecificities';
import { countUsage } from '../../calculators/countUsage';
import { mergeSpecificities } from '../../converters/mergeSpecificities';
import { handleVendorPrefix } from '../handleVendorPrefix';

let processedSelectors = null;
function selectorsProcessor(selectors) {
	processedSelectors = selectors;
}

const selectorParser = parser(selectorsProcessor);

function handlePseudoSelector(selectorObj, report) {
	const pseudoName = selectorObj.value.replace(reLeadingColons, '');

	if (rePrefixedString.test(pseudoName)) {
		handleVendorPrefix(pseudoName, report);
	}

	if (cssPseudoElements.some((name) => pseudoName === name)) {
		countUsage('pseudoElement', report.selectors.baseUsage);
		countUsage(
			selectorObj.value.replace(reLeadingColons, '::'),
			report.selectors.pseudoElementsUsage
		);
	} else if (cssPseudoClasses.some((name) => pseudoName === name)) {
		countUsage('pseudoClass', report.selectors.baseUsage);
		countUsage(
			selectorObj.value.replace(reLeadingColons, ':'),
			report.selectors.pseudoClassesUsage
		);
	}
}

const combinatorsMap = {
	'+': 'adjacentSibling',
	'>': 'child',
	' ': 'descendant',
	'~': 'generalSibling',
};

function isAllowedSelectorType(type) {
	return [
		'attribute',
		'class',
		'id',
		'pseudo',
		'tag',
		'universal',
	].includes(type);
}

function countSelectors(selectors, report, options) {
	let tmpSpecificity = [0, 0, 0];
	let baseSelectorsWithoutCombinators = 0;

	selectors.walk((selector) => {
		if (selector.type === 'combinator') {
			report.selectors.combinators.total++;
			report.selectors.combinators[combinatorsMap[selector.value]]++;
		}

		if (isAllowedSelectorType(selector.type)) {
			baseSelectorsWithoutCombinators++;

			if (selector.type === 'pseudo') {
				handlePseudoSelector(selector, report);
			} else {
				countUsage(selector.type, report.selectors.baseUsage);

				if (selector.type === 'attribute' && options.attributesUsage) {
					countUsage(String(selector), report.selectors.attributesUsage);
				}
			}

			const specificity = calculateSpecificity(selector);

			tmpSpecificity = mergeSpecificities(tmpSpecificity, specificity);
			report.selectors.specificity.total = mergeSpecificities(
				report.selectors.specificity.total,
				specificity
			);
		}
	});

	if (options.specificityGraph) {
		report.selectors.specificity.graphData.push(tmpSpecificity);
	}

	report.selectors.specificity.highest10.push({
		selector: String(selectors),
		specificity: tmpSpecificity,
	});

	report.selectors.specificity.highest10 = report
		.selectors
		.specificity
		.highest10
		.sort((a, b) => compareSpecificities(a.specificity, b.specificity));

	if (report.selectors.specificity.highest10.length > 10) {
		report.selectors.specificity.highest10.pop();
	}

	if (baseSelectorsWithoutCombinators > options.selectorComplexityThreshold) {
		report.selectors.complex++;
	}
}

export function handleSelector(selector, report, options) {
	report.selectors.total++;

	countUsage(selector, report.selectors.usage);

	const selectorByteLength = Buffer.byteLength(selector, 'utf8');
	report.selectors.length.total += selectorByteLength;

	if (report.selectors.length.longest < selectorByteLength) {
		report.selectors.length.longest = selectorByteLength;
		report.selectors.length.longestSelector = selector;
	}

	selectorParser.processSync(selector);

	/* istanbul ignore else */
	if (processedSelectors !== null) {
		countSelectors(processedSelectors, report, options);
	}
}
