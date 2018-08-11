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
				stylesheetSize: true,
				comments: true,
				atRules: true,
				rules: true,
				selectors: true,
				selectorsUsage: true,
				selectorComplexityThreshold: 4,
				specificityGraph: false,
				declarations: true,
				properties: true,
				engineTriggerProperties: true,
				uniqueDeclarationsList: false,
				displays: true,
				positions: true,
				zIndices: true,
				floats: true,
				borderRadiuses: true,
				letterSpacings: true,
				fonts: true,
				colors: true,
				backgroundColors: true,
				allColors: true,
				transitionsAndAnimations: true,
				functions: true,
				filters: true,
				gradients: true,
				units: true,
				variables: true,
				dataUris: true,
				browserHacks: true,
				performanceHacks: true,
			},
			isPlainObject(options) && Object.keys(options).length > 0
				? options
				: {}
		);

		const report = {
			styleSheetSize: {
				source: 0,
				gzipSource: 0,
			},
			comments: {
				total: 0,
				length: {
					total: 0,
					longest: 0,
					shortest: Number.MAX_SAFE_INTEGER,
					average: 0,
				},
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
				length: {
					total: 0,
					longest: 0,
					longestDataUri: null,
					average: 0,
				},
				sizeRatio: 0,
				usage: {},
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
			browserHacks: {
				total: 0,
				usage: {
					supports: {},
					media: {},
				},
			},
		};

		if (scancssOptions.stylesheetSize) {
			report.styleSheetSize.source = Buffer.byteLength(src, 'utf8');
			report.styleSheetSize.gzipSource = gzipSize.sync(src);
		}

		cssRoot.walk((node) => {
			if (node.type === 'comment' && scancssOptions.comments) {
				handleComment(node, report);
			}

			if (node.type === 'atrule' && scancssOptions.atRules) {
				handleAtRule(node, report, scancssOptions);
			}

			if (node.type === 'rule' && scancssOptions.rules) {
				handleRule(node, report, scancssOptions);
			}

			/**
			 * @font-face descriptors are not declarations
			 */
			if (
				node.type === 'decl' &&
				node.parent.name !== 'font-face' &&
				scancssOptions.declarations
			) {
				handleDeclaration(node, report, scancssOptions);
			}
		});

		if (scancssOptions.comments) {
			report.comments.sizeRatio = roundDivision(
				report.comments.length.total,
				report.styleSheetSize.source
			);

			report.comments.length.average = roundDivision(
				report.comments.length.total,
				report.comments.total,
				2
			);
		}

		if (scancssOptions.atRules) {
			report.atRules.unknown.unique = Object.keys(report.atRules.unknown.usage).length;
			report.mediaQueries.unique = Object.keys(report.mediaQueries.usage).length;
			report.mediaQueries.types.unique = Object.keys(report.mediaQueries.types.usage).length;
			report.mediaQueries.features.unique = Object.keys(report.mediaQueries.features.usage).length;
		}

		if (scancssOptions.selectors) {
			report.selectors.sizeRatio = roundDivision(
				report.selectors.length.total,
				report.styleSheetSize.source
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

		if (scancssOptions.declarations) {
			report.declarations.averagePerRule = roundDivision(
				report.declarations.total,
				report.rules.total,
				2
			);

			report.declarations.unique = report.declarations.list.length;
			if (scancssOptions.uniqueDeclarationsList === false) {
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
				report.styleSheetSize.source
			);
		}

		if (scancssOptions.properties) {
			report.properties.unique = Object.keys(report.properties.usage).length;
			report.properties.explicitDefaultingKeywords.unique = Object.keys(
				report.properties.explicitDefaultingKeywords.usage
			).length;
		}

		if (scancssOptions.displays) {
			report.displays.unique = Object.keys(report.displays.usage).length;
		}

		if (scancssOptions.positions) {
			report.positions.unique = Object.keys(report.positions.usage).length;
		}

		if (scancssOptions.zIndices) {
			report.zIndices.unique = Object.keys(report.zIndices.usage).length;
		}

		if (scancssOptions.floats) {
			report.floats.unique = Object.keys(report.floats.usage).length;
		}

		if (scancssOptions.borderRadiuses) {
			report.borderRadiuses.unique = Object.keys(report.borderRadiuses.usage).length;
		}

		if (scancssOptions.letterSpacings) {
			report.letterSpacings.unique = Object.keys(report.letterSpacings.usage).length;
		}

		if (scancssOptions.fonts) {
			report.fontSizes.unique = Object.keys(report.fontSizes.usage).length;
			report.lineHeights.unique = Object.keys(report.lineHeights.usage).length;
			report.fontFamilies.unique = Object.keys(report.fontFamilies.usage).length;
		}

		if (scancssOptions.functions) {
			report.functions.unique = Object.keys(report.functions.usage).length;
		}

		if (scancssOptions.filters) {
			report.filters.unique = Object.keys(report.filters.usage).length;
		}

		if (scancssOptions.gradients) {
			report.gradients.unique = Object.keys(report.gradients.usage).length;
		}

		if (scancssOptions.units) {
			report.units.unique = Object.keys(report.units.usage).length;
			report.units.excessive.unique = Object.keys(report.units.excessive.usage).length;
		}

		if (scancssOptions.variables) {
			report.variables.unique = Object.keys(report.variables.usage).length;
		}

		if (scancssOptions.dataUris) {
			report.dataUris.unique = Object.keys(report.dataUris.usage).length;

			report.dataUris.length.average = roundDivision(
				report.dataUris.length.total,
				report.dataUris.total,
				2
			);

			report.dataUris.sizeRatio = roundDivision(
				report.dataUris.length.total,
				report.styleSheetSize.source
			);
		}

		if (scancssOptions.colors) {
			report.colors.unique = Object.keys(report.colors.usage).length;
		}

		if (scancssOptions.backgroundColors) {
			report.backgroundColors.unique = Object.keys(report.backgroundColors.usage).length;
		}

		if (scancssOptions.allColors) {
			report.allColors.unique = Object.keys(report.allColors.usage).length;
		}

		if (scancssOptions.transitionsAndAnimations) {
			report.animations.unique = Object.keys(report.animations.usage).length;
		}

		report.vendorPrefixes.unique = Object.keys(report.vendorPrefixes.usage).length;
		report.vendorPrefixes.unknown.unique = Object.keys(report.vendorPrefixes.unknown.usage).length;

		return report;
	}
}
