# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0]

### Added
- Added `properties.autoKeyword` metric
- Added `mediaQueries.features.deprecated` metric
- Added `mediaQueries.types.deprecated` metric

### Changed
- Reorganized `properties.explicitDefaultingKeywords` to:
```
properties {
	inheritKeyword,
	initialKeyword,
	revertKeyword,
	unsetKeyword,
}
```

### Fixed

## [1.4.2]

### Fixed
- Corrected colors matching
- Corrected all functions matching
- Corrected units matching
- Corrected performance hacks matching
- Corrected named timing functions matching
- Corrected explicit defaulting keywords matching
- Reduce module install size

## [1.4.1]

### Fixed
- Fixed typo and unexpected behavior of `selectorsUsage` flag when `options` argument is not an object

## [1.4.0]

### Added
- Added `rules.withoutTrailingSemicolon` metric
- Added `comments.sizeRatioPercent` metric
- Added `selectors.sizeRatioPercent` metric
- Added `declarations.sizeRatioPercent` metric
- Added `dataUris.sizeRatioPercent` metric
- Added `selectors.attributesUsage` metric
- Added `attributesUsage` flag
- Added `imports` metric
- Added `widths` metric
- Added `widths` flag
- Added `heights` metric
- Added `heights` flag
- Added `selectors.specificity.highest10` metric
- Added `selectors.maxPerRuleList` metric
- Added `keyframes.definedAnimations` metric
- Added `animations.withoutDefinitions` metric

### Fixed
- Corrected `selectors.specificity.average` metric
- Corrected `selectors.unique` metric counting when `selectorsUsage` flag is `false`
- Corrected `transition` and `animation` longhand handling
- Corrected vendor-prefixed `transition-` and `animation-` properties handling
- Corrected counting of vendor prefixes it `@supports` at-rule
- Corrected `declarations.inAtRules` counting when `declarations` flag is set to `false`

## [1.3.2]

### Fixed
- Fixed counting of comma-separated media queries
- Fixed counting of invalid named timing functions in `transitions.invalidTimingFunctions` and `animations.invalidTimingFunctions`
- Fixed counting of `steps` and `frames` timing functions in `functions`, `transitions.timingFunctions`, `transitions.invalidTimingFunctions`, `animations.timingFunctions`, `animations.invalidTimingFunctions`
- Fixed case-insensitive counting of system colors, `currentColor`s and `transparent` colors
- Added missed `discrete` and `range` media features
- Added missed `future`, `current`, `drop`, `focus-visible`, `local-link`, `nth-col`, `nth-last-col`, `past`, `playing`, `paused`, `something`, `target-within`, `user-invalid` pseudo classes

## [1.3.1]

### Fixed
- Fixed counting of `rgb()`, `rgba()`, `hsl()`, `hsla()`, `hwb()` functions with whitespace syntax
- Fixed counting of `rgb()`, `rgba()`, `hsl()`, `hsla()`, `hwb()` functions with decimal numbers and exponential notations
- Fixed counting of data URIs with `<svg>` syntax
- Added missed `-moz-border-top-colors` and `-moz-border-left-colors` for handling as colorable properties
- Added missed `stop-color`, `flood-color` and `lighting-color` for handling as colorable properties

## [1.3.0]

### Added
- Added `properties` option
- Added `displays` option
- Added `positions` option
- Added `zIndices` option
- Added `floats` option
- Added `borderRadiuses` option
- Added `letterSpacings` option
- Added `fontSizes.keywords` metric:
```
keywords: {
	total,
	unique,
	usage,
}
```

### Changed
- Simplified all options flag names
- Reorganized `atRules.unknown` to:
```
unknown: {
	total,
	unique,
	usage,
}
```
- Reorganized `mediaQueries.types` to:
```
types: {
	total,
	unique,
	usage,
}
```
- Reorganized `vendorPrefixes.unknown` to:
```
unknown: {
	total,
	unique,
	usage,
}
```
- Reorganized `units` to:
```
units: {
	total,
	unique,
	usage,
	excessive: {
		total,
		unique,
		usage,
	},
},
```
- Reorganized `selectors` specificity metrics to:
```
selectors: {
	specificity: {
		total,
		highest,
		highestSelector,
		average,
		graphData,
	}
}
```
- Reorganized `selectors` length metrics to:
```
selectors: {
	length: {
		total,
		longest,
		longestSelector,
		average,
	}
}
```
- Reorganized `declarations` length metrics to:
```
declarations: {
	length: {
		total,
		longest,
		longestDeclaration,
		average,
	},
}
```
- Reorganized `dataUris` length metrics to:
```
dataUris: {
	length: {
		total,
		longest,
		longestDataUri,
		average,
	},
}
```
- Reorganized `comments` length metrics to:
```
comments: {
	length: {
		total,
		longest,
		shortest,
		average,
	},
}
```
- Renamed `styleSheetSize` metrics to:
```
styleSheetSize: {
	source,
	gzipSource,
}
```

### Fixed
- Fixed bugs with incorrect selectors specificity calculations
- Fixed considering variables or `calc` functions in `z-index` values as invalid
- Fixed inconsistent flags location

## [1.2.0]

### Added
- Added `keyframes.longestStepsChainAnimation`
- Added `keyframes.shortestStepsChainAnimation`
- Added `filters` metrics and new flag `collectFiltersData`
```
filters: {
	total,
	unique,
	usage,
}
```

### Changed
- Renamed `mediaQueries.onlyKeywords` to `mediaQueries.onlyKeyword`
- Renamed `*.vendorPrefixed` to `*.prefixed`
- Reorganized `mediaQueries.features` to:
```
features: {
	total,
	unique,
	vendorPrefixed,
	usage,
}
```

### Fixed
- Fixed bug with incorrect `transitions.invalidTimingFunctions` and `animations.invalidTimingFunctions` counting
- Fixed `declarations.uniqueRatio` calculation

## [1.1.0]

### Added
- Added `declarations.uniqueRatio` metric
- Added `declarations.totalByteLength` metric
- Added `declarations.longestByteLength` metric
- Added `declarations.longestByteLengthDeclaration` metric
- Added `declarations.averageByteLength` metric
- Added `declarations.sizeRatio` metric
- Added `animations.total` metric
- Added `animations.unique` metric
- Added `animations.usage` metric
- Added `functions.vendorPrefixed` metric
- Added `background-image` to colorable properties

### Changed
- Excluded @font-face descriptors from handling as declarations
- Corrected counting of vendor-prefixed functions
- Set `collectSpecificityGraphData` flag to `false` by default
- Set `collectUniqueDeclarationsList` flag to `false` by default

## [1.0.1]

### Fixed
- Fixed `isNumber` predicate function
