# scancss

A robust CSS stylesheet statistics collector and analyzer

[![Build Status](https://travis-ci.org/everget/scancss.svg?branch=master)](https://travis-ci.org/everget/scancss) [![Build status](https://ci.appveyor.com/api/projects/status/dl88bnkepmy3blwr/branch/master?svg=true)](https://ci.appveyor.com/project/everget/scancss/branch/master) [![codecov](https://codecov.io/gh/everget/scancss/branch/master/graph/badge.svg)](https://codecov.io/gh/everget/scancss) [![Coverage Status](https://coveralls.io/repos/github/everget/scancss/badge.svg?branch=master)](https://coveralls.io/github/everget/scancss?branch=master)

[![CodeFactor](https://www.codefactor.io/repository/github/everget/scancss/badge)](https://www.codefactor.io/repository/github/everget/scancss) [![codebeat badge](https://codebeat.co/badges/b930dfd0-6922-4750-b32c-9f8fdcccb0f6)](https://codebeat.co/projects/github-com-everget-scancss-master) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/81c450c367f14b6ea8430a0ad348429c)](https://www.codacy.com/project/coriolan61/scancss/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=everget/scancss&amp;utm_campaign=Badge_Grade_Dashboard) [![BCH compliance](https://bettercodehub.com/edge/badge/everget/scancss?branch=master)](https://bettercodehub.com/)

[![npm version](https://img.shields.io/npm/v/scancss.svg?style=flat)](https://www.npmjs.com/package/scancss) [![npm](https://img.shields.io/npm/dm/scancss.svg?style=flat)](https://www.npmjs.com/package/scancss) [![install size](https://packagephobia.now.sh/badge?p=scancss@1.0.0)](https://packagephobia.now.sh/result?p=scancss@1.0.0) [![David](https://img.shields.io/david/dev/everget/scancss.svg)](https://david-dm.org/everget/scancss) [![Known Vulnerabilities](https://snyk.io/test/github/everget/scancss/badge.svg)](https://snyk.io/test/github/everget/scancss)

## Table of contents

1. [Installation](#installation)

1. [Usage](#usage)

1. [Options](#options)
	* [collectStylesheetSizeData](#collectstylesheetsizedata)
	* [collectCommentsData](#collectcommentsdata)
	* [collectAtRulesData](#collectatrulesdata)
	* [collectRulesData](#collectrulesdata)
	* [collectSelectorsData](#collectselectorsdata)
	* [collectSelectorsUsage](#collectselectorsusage)
	* [selectorComplexityThreshold](#selectorcomplexitythreshold)
	* [collectSpecificityGraphData](#collectspecificitygraphdata)
	* [collectDeclarationsData](#collectdeclarationsdata)
	* [collectEngineTriggerProperties](#collectenginetriggerproperties)
	* [collectDeclarationsList](#collectdeclarationslist)
	* [collectFontsData](#collectfontsdata)
	* [collectColorsData](#collectcolorsdata)
	* [collectBackgroundColorsData](#collectbackgroundcolorsdata)
	* [collectAllColorsData](#collectallcolorsdata)
	* [collectTransitionsAndAnimationsData](#collecttransitionsandanimationsdata)
	* [collectFunctionsData](#collectfunctionsdata)
	* [collectGradientsData](#collectgradientsdata)
	* [collectUnitsData](#collectunitsdata)
	* [collectVariablesData](#collectvariablesdata)
	* [collectDataUrisData](#collectdataurisdata)
	* [collectBrowserHacksData](#collectbrowserhacksdata)
	* [collectPerformanceHacksData](#collectperformancehacksdata)

1. [Report Structure](#reportstructure)
	* [styleSheetSize](#stylesheetsize)
	* [comments](#comments)
	* [atRules](#atrules)
	* [mediaQueries](#mediaqueries)
	* [keyframes](#keyframes)
	* [rules](#rules)
	* [selectors](#selectors)
	* [declarations](#declarations)
	* [properties](#properties)
	* [displays](#displays)
	* [positions](#positions)
	* [zIndices](#zindices)
	* [floats](#floats)
	* [borderRadiuses](#borderradiuses)
	* [letterSpacings](#letterspacings)
	* [fontSizes](#fontsizes)
	* [lineHeights](#lineheights)
	* [fontFamilies](#fontfamilies)
	* [colors](#colors)
	* [backgroundColors](#backgroundcolors)
	* [allColors](#allcolors)
	* [transitions](#transitions)
	* [animations](#animations)
	* [functions](#functions)
	* [gradients](#gradients)
	* [dataUris](#datauris)
	* [browserHacks](#browserhacks)
	* [units](#units)
	* [variables](#variables)
	* [vendorPrefixes](#vendorprefixes)

1. [License](#license)

## Installation
```
npm install scancss --save
```

```
yarn add scancss --save
```

[Back to top](#table-of-contents)

## Usage

```js
import scancss from 'scancss';
// or const scancss = require('scancss').default;

const stylesheet = `
	.selector {
		display: inline-block;
		position: relative;
		width: 40px;
		height: 40px;
		background-color: #123123;
		color: #fff;
	}

	@media screen and (max-width: 480px) {
		.selector {
			width: 20px;
			height: 20px;
			background-color: #456456;
			color: #000;
		}
	}
`;

const report = scancss(stylesheet, {});
```

[Back to top](#table-of-contents)

## Options

#### collectStylesheetSizeData

* Default: `true`

#### collectCommentsData

* Default: `true`

#### collectAtRulesData

* Default: `true`

#### collectRulesData

* Default: `true`

#### collectSelectorsData

* Default: `true`

#### collectSelectorsUsage

* Default: `true`

#### selectorComplexityThreshold

* Default: `4`

#### collectSpecificityGraphData

* Default: `true`

#### collectDeclarationsData

* Default: `true`

#### collectEngineTriggerProperties

* Default: `true`

#### collectDeclarationsList

* Default: `true`

#### collectFontsData

* Default: `true`

#### collectColorsData

* Default: `true`

#### collectBackgroundColorsData

* Default: `true`

#### collectAllColorsData

* Default: `true`

#### collectTransitionsAndAnimationsData

* Default: `true`

#### collectFunctionsData

* Default: `true`

#### collectGradientsData

* Default: `true`

#### collectUnitsData

* Default: `true`

#### collectVariablesData

* Default: `true`

#### collectDataUrisData

* Default: `true`

#### collectBrowserHacksData

* Default: `true`

#### collectPerformanceHacksData

* Default: `true`

[Back to top](#table-of-contents)

## Report Structure

#### styleSheetSize

* **sourceByteLength** - `number`

* **gzipByteLength** - `number`

#### comments

* **total** - `number`

* **totalByteLength** - `number`

* **longestByteLength** - `number`

* **shortestByteLength** - `number`
_NOTE_: If there are no comments in a stylesheet 9007199254740991 will be returned

* **averageByteLength** - `number`

* **sizeRatio** - `number`

#### atRules

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **empty** - `number`

* **vendorPrefixed** - `number`

* **unknown** - `Record<string, number>`

#### mediaQueries

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **onlyKeywords** - `number`

* **vendorPrefixedFeatures** - `number`

* **types** - `Record<string, number>`

* **features** - `Record<string, number>`

#### keyframes

* **stepsChains** - `Record<string, number>`

* **longestStepsChain** - `string | null`

* **longestStepsChainLength** - `number`

* **shortestStepsChain** - `string | null`

* **shortestStepsChainLength** - `number`
_NOTE_: If there are no @keyframes in a stylesheet 9007199254740991 will be returned

* **vendorPrefixedFeatures** - `number`

* **animatableProperties** - `Array<string>`

#### rules

* **total** - `number`

* **empty** - `number`

#### selectors

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **baseUsage** - `Record<string, number>`

* **pseudoClassesUsage** - `Record<string, number>`

* **pseudoElementsUsage** - `Record<string, number>`

* **combinators** - `Record<string, number>`

* **complex** - `number`

* **maxPerRule** - `number`

* **averagePerRule** - `number`

* **totalByteLength** - `number`

* **longestByteLength** - `number`

* **longestByteLengthSelector** - `string | null`

* **averageByteLength** - `number`

* **totalSpecificity** - `[number, number, number]`

* **averageSpecificity** - `[number, number, number]`

* **highestSpecificity** - `[number, number, number]`

* **highestSpecificitySelector** - `string | null`

* **sizeRatio** - `number`

* **specificityGraphData** - `Array<[number, number, number]>`

#### declarations

* **total** - `number`

* **unique** - `number`

* **important** - `number`

* **averagePerRule** - `number`

* **uniqueRatio** - `number`

* **totalByteLength** - `number`

* **longestByteLength** - `number`

* **longestByteLengthDeclaration** - `string | null`

* **averageByteLength** - `number`

* **sizeRatio** - `number`

* **inAtRules** - `Record<string, number>`

* **list** - `Array<string>`

#### properties

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **shorthands** - `number`

* **vendorPrefixed** - `number`

* **unitless** - `number`

* **resetsViaAll** - `number`

* **negativeMargins** - `number`

* **anonymousReplacedElements** - `number`

* **performanceHacks** - `Record<string, number>`

* **explicitDefaultingKeywords** - `Record<'total' | 'inherit' | 'initial' | 'revert' | 'unset', number>`

* **engineTriggers** - `Record<'composite' | 'layout' | 'paint', Record<'blink' | 'edgehtml' | 'gecko' | 'webkit', number>>`

#### displays

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

#### positions

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

#### zIndices

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **invalid** - `Record<string, number>`

#### borderRadiuses

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

#### floats

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

#### letterSpacings

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

#### fontSizes

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

#### lineHeights

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **hardCoded** - `number`

#### fontFamilies

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **generic** - `Record<string, number>`

* **system** - `Record<string, number>`

* **withoutFallbackFonts** - `number`

* **imageReplacementHacks** - `number`

#### colors

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **currentColorKeyword** - `number`

* **transparentKeyword** - `number`

* **models** - `Record<'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hwb', number>`

* **named** - `Record<string, number>`

* **system** - `Record<string, number>`

#### backgroundColors

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **currentColorKeyword** - `number`

* **transparentKeyword** - `number`

* **models** - `Record<'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hwb', number>`

* **named** - `Record<string, number>`

* **system** - `Record<string, number>`

#### allColors

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **currentColorKeyword** - `number`

* **transparentKeyword** - `number`

* **models** - `Record<'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hwb', number>`

* **named** - `Record<string, number>`

* **system** - `Record<string, number>`

#### transitions

* **properties** - `Record<string, number>`

* **longestDuration** - `number`

* **shortestDuration** - `number`
_NOTE_: If there are no transition durations in a stylesheet 9007199254740991 will be returned

* **longestDelay** - `number`

* **shortestDelay** - `number`
_NOTE_: If there are no transition delays in a stylesheet 9007199254740991 will be returned

* **timingFunctions** - `Record<string, number>`

* **invalidTimingFunctions** - `Record<string, number>`

#### animations

* **infinite** - `number`

* **longestDuration** - `number`

* **shortestDuration** - `number`
_NOTE_: If there are no animation durations in a stylesheet 9007199254740991 will be returned

* **longestDelay** - `number`

* **shortestDelay** - `number`
_NOTE_: If there are no animation delays in a stylesheet 9007199254740991 will be returned

* **timingFunctions** - `Record<string, number>`

* **invalidTimingFunctions** - `Record<string, number>`

#### functions

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

#### gradients

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

#### dataUris

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **totalByteLength** - `number`

* **averageByteLength** - `number`

* **sizeRatio** - `number`

#### browserHacks

* **total** - `number`

* **usage** - `Record<string, Record<string, number>>`

#### units

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **excessive** - `number`

* **excessiveUsage** - `Record<string, number>`

#### variables

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **valuesMap** - `Record<string, number>`

#### vendorPrefixes

* **total** - `number`

* **unique** - `number`

* **unknown** - `Record<string, number>`

* **usage** - `Record<string, number>`

[Back to top](#table-of-contents)

## License

MIT © Alex Orekhov @everget

[Back to top](#table-of-contents)
