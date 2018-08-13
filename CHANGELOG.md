# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.1]

### Fixed
- Correct counting `rgb()`, `rgba()`, `hsl()`, `hsla()`, `hwb()` functions with whitespace syntax
- Correct counting `rgb()`, `rgba()`, `hsl()`, `hsla()`, `hwb()` functions with decimal numbers and exponential notations
- Fix unmatching data URIs with `<svg>` syntax
- Add missed `-moz-border-top-colors` and `-moz-border-left-colors` for handling as colorable properties
- Add missed `stop-color`, `flood-color` and `lighting-color` for handling as colorable properties

## [1.3.0]

### Added
- Add `properties` option
- Add `displays` option
- Add `positions` option
- Add `zIndices` option
- Add `floats` option
- Add `borderRadiuses` option
- Add `letterSpacings` option
- Add `fontSizes.keywords` metric:
```
keywords: {
	total,
	unique,
	usage,
}
```

### Changed
- Simplify all options flag names
- Reorganize `atRules.unknown` to:
```
unknown: {
	total,
	unique,
	usage,
}
```
- Reorganize `mediaQueries.types` to:
```
types: {
	total,
	unique,
	usage,
}
```
- Reorganize `vendorPrefixes.unknown` to:
```
unknown: {
	total,
	unique,
	usage,
}
```
- Reorganize `units` to:
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
- Reorganize `selectors` specificity metrics to:
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
- Reorganize `selectors` length metrics to:
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
- Reorganize `declarations` length metrics to:
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
- Reorganize `dataUris` length metrics to:
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
- Reorganize `comments` length metrics to:
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
- Rename `styleSheetSize` metrics to:
```
styleSheetSize: {
	source,
	gzipSource,
}
```

### Fixed
- Fix bugs with incorrect selectors specificity calculations
- Fix considering variables or `calc` functions in `z-index` values as invalid
- Fix inconsistent flags location

## [1.2.0]

### Added
- Add `keyframes.longestStepsChainAnimation`
- Add `keyframes.shortestStepsChainAnimation`
- Add `filters` metrics and new flag `collectFiltersData`
```
filters: {
	total,
	unique,
	usage,
}
```

### Changed
- Rename `mediaQueries.onlyKeywords` to `mediaQueries.onlyKeyword`
- Rename `*.vendorPrefixed` to `*.prefixed`
- Reorganize `mediaQueries.features` to:
```
features: {
	total,
	unique,
	vendorPrefixed,
	usage,
}
```

### Fixed
- Fix bug with incorrect `transitions.invalidTimingFunctions` and `animations.invalidTimingFunctions` counting
- Fix `declarations.uniqueRatio` calculation

## [1.1.0]

### Added
- Add `declarations.uniqueRatio` metric
- Add `declarations.totalByteLength` metric
- Add `declarations.longestByteLength` metric
- Add `declarations.longestByteLengthDeclaration` metric
- Add `declarations.averageByteLength` metric
- Add `declarations.sizeRatio` metric
- Add `animations.total` metric
- Add `animations.unique` metric
- Add `animations.usage` metric
- Add `functions.vendorPrefixed` metric
- Add `background-image` to colorable properties

### Changed
- Exclude @font-face descriptors from handling as declarations
- Count vendor-prefixed functions
- Set `collectSpecificityGraphData` flag to `false` by default
- Set `collectUniqueDeclarationsList` flag to `false` by default

## [1.0.1]

### Changed
- Correct `isNumber` predicate function
