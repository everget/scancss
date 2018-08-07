# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0]

### Added
- Add **declarations.uniqueRatio** metric
- Add **declarations.totalByteLength** metric
- Add **declarations.longestByteLength** metric
- Add **declarations.longestByteLengthDeclaration** metric
- Add **declarations.averageByteLength** metric
- Add **declarations.sizeRatio** metric
- Add **animations.total** metric
- Add **animations.unique** metric
- Add **animations.usage** metric
- Add **functions.vendorPrefixed** metric
- Add `background-image` to colorable properties

### Changed
- Exclude @font-face descriptors from handling as declarations
- Count vendor-prefixed functions
- Set `collectSpecificityGraphData` flag to `false` by default
- Set `collectUniqueDeclarationsList` flag to `false` by default

## [1.0.1]

### Changed
- Correct `isNumber` predicate function
