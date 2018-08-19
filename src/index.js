import { default as gzipSize } from 'gzip-size';
import isPlainObject from 'lodash.isplainobject';

import { handleComment } from './handlers/handleComment';
import { handleAtRule } from './handlers/atrules/handleAtRule';
import { handleRule } from './handlers/handleRule';
import { handleDeclaration } from './handlers/handleDeclaration';
import { roundDivision } from './calculators/roundDivision';
import { percentDifference } from './calculators/percentDifference';
import { getEmptyReport } from './common/getEmptyReport';
import { parseCss } from './common/parseCss';

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
				attributesUsage: true,
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
				widths: true,
				heights: true,
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

		const report = getEmptyReport();

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

			report.comments.sizeRatioPercent = percentDifference(
				report.styleSheetSize.source,
				report.comments.length.total
			);

			report.comments.length.average = roundDivision(
				report.comments.length.total,
				report.comments.total,
				2
			);
		}

		if (scancssOptions.atRules) {
			report.atRules.unknown.unique = Object.keys(report.atRules.unknown.usage).length;
			report.imports.unique = Object.keys(report.imports.usage).length;
			report.mediaQueries.unique = Object.keys(report.mediaQueries.usage).length;
			report.mediaQueries.types.unique = Object.keys(report.mediaQueries.types.usage).length;
			report.mediaQueries.features.unique = Object.keys(report.mediaQueries.features.usage).length;
		}

		if (scancssOptions.selectors) {
			report.selectors.sizeRatio = roundDivision(
				report.selectors.length.total,
				report.styleSheetSize.source
			);

			report.selectors.sizeRatioPercent = percentDifference(
				report.styleSheetSize.source,
				report.selectors.length.total
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

			const highestSpecificitySelector = report.selectors.specificity.highest10[0];
			if (isPlainObject(highestSpecificitySelector)) {
				report.selectors.specificity.highest = highestSpecificitySelector.specificity;
				report.selectors.specificity.highestSelector = highestSpecificitySelector.selector;
			}

			report.selectors.specificity.average = [
				roundDivision(
					report.selectors.specificity.total[0],
					report.selectors.total || 0,
					2
				),
				roundDivision(
					report.selectors.specificity.total[1],
					report.selectors.total || 0,
					2
				),
				roundDivision(
					report.selectors.specificity.total[2],
					report.selectors.total || 0,
					2
				),
			];

			report.selectors.unique = Object.keys(report.selectors.usage).length;

			if (options.selectorsUsage === false) {
				report.selectors.usage = {};
			}
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

			report.declarations.sizeRatioPercent = percentDifference(
				report.styleSheetSize.source,
				report.declarations.length.total
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

		if (scancssOptions.widths) {
			report.widths.unique = Object.keys(report.widths.usage).length;
		}

		if (scancssOptions.heights) {
			report.heights.unique = Object.keys(report.heights.usage).length;
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

			report.dataUris.sizeRatioPercent = percentDifference(
				report.styleSheetSize.source,
				report.dataUris.length.total
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
