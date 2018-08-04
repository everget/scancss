# scancss

A robust CSS stylesheet statistics collector and analyzer

[![Build Status](https://travis-ci.org/everget/scancss.svg?branch=master)](https://travis-ci.org/everget/scancss)

## Table of contents
1. [Installation](#installation)
1. [Usage](#usage)
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
// or const scancss = require('scancss');

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

const report = scancss(stylesheet, options);
```

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

* **longestDelay** - `number`

* **shortestDelay** - `number`

* **timingFunctions** - `Record<string, number>`

* **invalidTimingFunctions** - `Record<string, number>`

#### animations

* **infinite** - `number`

* **longestDuration** - `number`

* **shortestDuration** - `number`

* **longestDelay** - `number`

* **shortestDelay** - `number`

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
