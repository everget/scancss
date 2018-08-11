import { default as gzipSize } from 'gzip-size';
import isPlainObject from 'lodash.isplainobject';

import { handleComment } from './handlers/handleComment';
import { handleAtRule } from './handlers/atrules/handleAtRule';
import { handleRule } from './handlers/handleRule';
import { handleDeclaration } from './handlers/handleDeclaration';
import { roundDivision } from './calculators/roundDivision';
import { parseCss } from './converters/parseCss';

export default function scancss(src, options) {
	if (typeof src !== 'string') {
		throw new TypeError('`scancss` expects a string');
	} else {
		const cssRoot = parseCss(src);

		const scancssOptions = Object.assign(
			{},
			{
				collectStylesheetSizeData: true,
				collectCommentsData: true,
				collectAtRulesData: true,
				collectRulesData: true,
				collectSelectorsData: true,
				collectSelectorsUsage: true,
				selectorComplexityThreshold: 4,
				collectSpecificityGraphData: false,
				collectDeclarationsData: true,
				collectEngineTriggerProperties: true,
				collectUniqueDeclarationsList: false,
				collectFontsData: true,
				collectColorsData: true,
				collectBackgroundColorsData: true,
				collectAllColorsData: true,
				collectTransitionsAndAnimationsData: true,
				collectFunctionsData: true,
				collectFiltersData: true,
				collectGradientsData: true,
				collectUnitsData: true,
				collectVariablesData: true,
				collectDataUrisData: true,
				collectBrowserHacksData: true,
				collectPerformanceHacksData: true,
			},
			isPlainObject(options) && Object.keys(options).length > 0
				? options
				: {}
		);

		const report = {
			styleSheetSize: {
				sourceByteLength: 0,
				gzipByteLength: 0,
			},
			comments: {
				total: 0,
				totalByteLength: 0,
				longestByteLength: 0,
				shortestByteLength: Number.MAX_SAFE_INTEGER,
				averageByteLength: 0,
				sizeRatio: 0,
			},
			atRules: {
				total: 0,
				empty: 0,
				prefixed: 0,
				unknown: {
					total: 0,
					unique: 0,
					usage: {},
				},
				usage: {},
			},
			mediaQueries: {
				total: 0,
				unique: 0,
				onlyKeyword: 0,
				types: {
					total: 0,
					unique: 0,
					usage: {},
				},
				features: {
					total: 0,
					unique: 0,
					prefixed: 0,
					usage: {},
				},
				usage: {},
			},
			keyframes: {
				stepsChains: {},
				longestStepsChain: null,
				longestStepsChainLength: 0,
				longestStepsChainAnimation: null,
				shortestStepsChain: null,
				shortestStepsChainLength: Number.MAX_SAFE_INTEGER,
				shortestStepsChainAnimation: null,
				animatableProperties: [],
			},
			rules: {
				total: 0,
				empty: 0,
			},
			selectors: {
				total: 0,
				unique: 0,
				baseUsage: {},
				pseudoClassesUsage: {},
				pseudoElementsUsage: {},
				combinators: {
					total: 0,
					adjacentSibling: 0,
					child: 0,
					descendant: 0,
					generalSibling: 0,
				},
				complex: 0,
				maxPerRule: 0,
				averagePerRule: 0,
				length: {
					total: 0,
					longest: 0,
					longestSelector: null,
					average: 0,
				},
				specificity: {
					total: [0, 0, 0],
					highest: [0, 0, 0],
					highestSelector: null,
					average: [0, 0, 0],
					graphData: [],
				},
				sizeRatio: 0,
				usage: {},
			},
			declarations: {
				total: 0,
				unique: 0,
				uniqueRatio: 0,
				important: 0,
				averagePerRule: 0,
				length: {
					total: 0,
					longest: 0,
					longestDeclaration: null,
					average: 0,
				},
				sizeRatio: 0,
				inAtRules: {},
				list: [],
			},
			properties: {
				total: 0,
				unique: 0,
				shorthands: 0,
				prefixed: 0,
				unitless: 0,
				resetsViaAll: 0,
				negativeMargins: 0,
				anonymousReplacedElements: 0,
				performanceHacks: {},
				explicitDefaultingKeywords: {
					total: 0,
					unique: 0,
					usage: {},
				},
				engineTriggers: {
					composite: {
						blink: 0,
						edgehtml: 0,
						gecko: 0,
						webkit: 0,
					},
					layout: {
						blink: 0,
						edgehtml: 0,
						gecko: 0,
						webkit: 0,
					},
					paint: {
						blink: 0,
						edgehtml: 0,
						gecko: 0,
						webkit: 0,
					},
				},
				usage: {},
			},
			displays: {
				total: 0,
				unique: 0,
				usage: {},
			},
			positions: {
				total: 0,
				unique: 0,
				usage: {},
			},
			zIndices: {
				total: 0,
				unique: 0,
				invalid: {},
				usage: {},
			},
			floats: {
				total: 0,
				unique: 0,
				usage: {},
			},
			borderRadiuses: {
				total: 0,
				unique: 0,
				usage: {},
			},
			letterSpacings: {
				total: 0,
				unique: 0,
				usage: {},
			},
			fontSizes: {
				total: 0,
				unique: 0,
				keywords: {
					total: 0,
					unique: 0,
					usage: {},
				},
				usage: {},
			},
			lineHeights: {
				total: 0,
				unique: 0,
				hardCoded: 0,
				usage: {},
			},
			fontFamilies: {
				total: 0,
				unique: 0,
				generic: {},
				system: {},
				withoutFallbackFonts: 0,
				imageReplacementHacks: 0,
				usage: {},
			},
			colors: {
				total: 0,
				unique: 0,
				currentColorKeyword: 0,
				transparentKeyword: 0,
				models: {},
				named: {},
				system: {},
				usage: {},
			},
			backgroundColors: {
				total: 0,
				unique: 0,
				currentColorKeyword: 0,
				transparentKeyword: 0,
				models: {},
				named: {},
				system: {},
				usage: {},
			},
			allColors: {
				total: 0,
				unique: 0,
				currentColorKeyword: 0,
				transparentKeyword: 0,
				models: {},
				named: {},
				system: {},
				usage: {},
			},
			transitions: {
				properties: {},
				longestDuration: 0,
				shortestDuration: Number.MAX_SAFE_INTEGER,
				longestDelay: 0,
				shortestDelay: Number.MAX_SAFE_INTEGER,
				timingFunctions: {},
				invalidTimingFunctions: {},
			},
			animations: {
				total: 0,
				unique: 0,
				infinite: 0,
				longestDuration: 0,
				shortestDuration: Number.MAX_SAFE_INTEGER,
				longestDelay: 0,
				shortestDelay: Number.MAX_SAFE_INTEGER,
				usage: {},
				timingFunctions: {},
				invalidTimingFunctions: {},
			},
			functions: {
				total: 0,
				unique: 0,
				prefixed: 0,
				usage: {},
			},
			filters: {
				total: 0,
				unique: 0,
				usage: {},
			},
			gradients: {
				total: 0,
				unique: 0,
				usage: {},
			},
			dataUris: {
				total: 0,
				unique: 0,
				totalByteLength: 0,
				averageByteLength: 0,
				sizeRatio: 0,
				usage: {},
			},
			browserHacks: {
				total: 0,
				usage: {
					supports: {},
					media: {},
				},
			},
			units: {
				total: 0,
				unique: 0,
				usage: {},
				excessive: {
					total: 0,
					unique: 0,
					usage: {},
				},
			},
			variables: {
				total: 0,
				unique: 0,
				usage: {},
				valuesMap: {},
			},
			vendorPrefixes: {
				total: 0,
				unique: 0,
				unknown: {
					total: 0,
					unique: 0,
					usage: {},
				},
				usage: {},
			},
		};

		if (scancssOptions.collectStylesheetSizeData) {
			report.styleSheetSize.sourceByteLength = Buffer.byteLength(src, 'utf8');
			report.styleSheetSize.gzipByteLength = gzipSize.sync(src);
		}

		cssRoot.walk((node) => {
			if (node.type === 'comment' && scancssOptions.collectCommentsData) {
				handleComment(node, report);
			}

			if (node.type === 'atrule' && scancssOptions.collectAtRulesData) {
				handleAtRule(node, report, scancssOptions);
			}

			if (node.type === 'rule' && scancssOptions.collectRulesData) {
				handleRule(node, report, scancssOptions);
			}

			/**
			 * @font-face descriptors are not declarations
			 */
			if (
				node.type === 'decl' &&
				node.parent.name !== 'font-face' &&
				scancssOptions.collectDeclarationsData
			) {
				handleDeclaration(node, report, scancssOptions);
			}
		});

		if (scancssOptions.collectCommentsData) {
			report.comments.sizeRatio = roundDivision(
				report.comments.totalByteLength,
				report.styleSheetSize.sourceByteLength
			);

			report.comments.averageByteLength = roundDivision(
				report.comments.totalByteLength,
				report.comments.total,
				2
			);
		}

		if (scancssOptions.collectAtRulesData) {
			report.atRules.unknown.unique = Object.keys(report.atRules.unknown.usage).length;
			report.mediaQueries.unique = Object.keys(report.mediaQueries.usage).length;
			report.mediaQueries.types.unique = Object.keys(report.mediaQueries.types.usage).length;
			report.mediaQueries.features.unique = Object.keys(report.mediaQueries.features.usage).length;
		}

		if (scancssOptions.collectSelectorsData) {
			report.selectors.sizeRatio = roundDivision(
				report.selectors.length.total,
				report.styleSheetSize.sourceByteLength
			);

			report.selectors.length.average = roundDivision(
				report.selectors.length.total,
				report.selectors.total,
				2
			);

			report.selectors.averagePerRule = roundDivision(
				report.selectors.total,
				report.rules.total,
				2
			);

			report.selectors.specificity.average = [
				roundDivision(
					report.selectors.specificity.total[0],
					report.selectors.baseUsage.id || 0,
					2
				),
				roundDivision(
					report.selectors.specificity.total[1],
					(
						(report.selectors.baseUsage.attribute || 0) +
						(report.selectors.baseUsage.class || 0) +
						(report.selectors.baseUsage.pseudoClass || 0)
					),
					2
				),
				roundDivision(
					report.selectors.specificity.total[2],
					(
						(report.selectors.baseUsage.tag || 0) +
						(report.selectors.baseUsage.pseudoElement || 0)
					),
					2
				),
			];

			report.selectors.unique = Object.keys(report.selectors.usage).length;
		}

		if (scancssOptions.collectDeclarationsData) {
			report.declarations.averagePerRule = roundDivision(
				report.declarations.total,
				report.rules.total,
				2
			);

			report.declarations.unique = report.declarations.list.length;
			if (scancssOptions.collectUniqueDeclarationsList === false) {
				report.declarations.list.length = 0;
			}

			report.declarations.uniqueRatio = roundDivision(
				report.declarations.unique,
				report.declarations.total
			);

			report.declarations.length.average = roundDivision(
				report.declarations.length.total,
				report.declarations.total,
				2
			);

			report.declarations.sizeRatio = roundDivision(
				report.declarations.length.total,
				report.styleSheetSize.sourceByteLength
			);

			report.properties.unique = Object.keys(report.properties.usage).length;
			report.properties.explicitDefaultingKeywords.unique = Object.keys(
				report.properties.explicitDefaultingKeywords.usage
			).length;

			report.displays.unique = Object.keys(report.displays.usage).length;
			report.positions.unique = Object.keys(report.positions.usage).length;
			report.floats.unique = Object.keys(report.floats.usage).length;
			report.zIndices.unique = Object.keys(report.zIndices.usage).length;
			report.borderRadiuses.unique = Object.keys(report.borderRadiuses.usage).length;
			report.letterSpacings.unique = Object.keys(report.letterSpacings.usage).length;
			report.fontSizes.unique = Object.keys(report.fontSizes.usage).length;
			report.lineHeights.unique = Object.keys(report.lineHeights.usage).length;
			report.fontFamilies.unique = Object.keys(report.fontFamilies.usage).length;
			report.functions.unique = Object.keys(report.functions.usage).length;
			report.filters.unique = Object.keys(report.filters.usage).length;
			report.gradients.unique = Object.keys(report.gradients.usage).length;

			if (scancssOptions.collectUnitsData) {
				report.units.unique = Object.keys(report.units.usage).length;
				report.units.excessive.unique = Object.keys(report.units.excessive.usage).length;
			}

			report.vendorPrefixes.unique = Object.keys(report.vendorPrefixes.usage).length;
			report.vendorPrefixes.unknown.unique = Object.keys(report.vendorPrefixes.unknown.usage).length;

			report.variables.unique = Object.keys(report.variables.usage).length;

			report.dataUris.unique = Object.keys(report.dataUris.usage).length;
			report.dataUris.sizeRatio = roundDivision(
				report.dataUris.totalByteLength,
				report.styleSheetSize.sourceByteLength
			);

			report.dataUris.averageByteLength = roundDivision(
				report.dataUris.totalByteLength,
				report.dataUris.total,
				2
			);

			report.colors.unique = Object.keys(report.colors.usage).length;
			report.backgroundColors.unique = Object.keys(report.backgroundColors.usage).length;
			report.allColors.unique = Object.keys(report.allColors.usage).length;

			if (scancssOptions.collectTransitionsAndAnimationsData) {
				report.animations.unique = Object.keys(report.animations.usage).length;
			}
		}

		return report;
	}
}
