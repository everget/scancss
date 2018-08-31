# scancss

A robust CSS stylesheet statistics collector and analyzer

[![Build Status](https://travis-ci.org/everget/scancss.svg?branch=master)](https://travis-ci.org/everget/scancss) [![Build status](https://ci.appveyor.com/api/projects/status/dl88bnkepmy3blwr/branch/master?svg=true)](https://ci.appveyor.com/project/everget/scancss/branch/master) [![codecov](https://codecov.io/gh/everget/scancss/branch/master/graph/badge.svg)](https://codecov.io/gh/everget/scancss) [![Coverage Status](https://coveralls.io/repos/github/everget/scancss/badge.svg?branch=master)](https://coveralls.io/github/everget/scancss?branch=master)

[![CodeFactor](https://www.codefactor.io/repository/github/everget/scancss/badge)](https://www.codefactor.io/repository/github/everget/scancss) [![codebeat badge](https://codebeat.co/badges/b930dfd0-6922-4750-b32c-9f8fdcccb0f6)](https://codebeat.co/projects/github-com-everget-scancss-master) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/81c450c367f14b6ea8430a0ad348429c)](https://www.codacy.com/project/coriolan61/scancss/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=everget/scancss&amp;utm_campaign=Badge_Grade_Dashboard) [![BCH compliance](https://bettercodehub.com/edge/badge/everget/scancss?branch=master)](https://bettercodehub.com/)

[![npm version](https://img.shields.io/npm/v/scancss.svg?style=flat)](https://www.npmjs.com/package/scancss) [![npm](https://img.shields.io/npm/dm/scancss.svg?style=flat)](https://www.npmjs.com/package/scancss) [![install size](https://packagephobia.now.sh/badge?p=scancss@1.0.0)](https://packagephobia.now.sh/result?p=scancss@1.0.0) [![David](https://img.shields.io/david/dev/everget/scancss.svg)](https://david-dm.org/everget/scancss) [![Known Vulnerabilities](https://snyk.io/test/github/everget/scancss/badge.svg)](https://snyk.io/test/github/everget/scancss)

## Table of contents

1. [Installation](#installation)

1. [Usage](#usage)

1. [Report Structure](#report-structure)

1. [Examples](#examples)

1. [Options](#options)
	* [stylesheetSize](#stylesheetsize)
	* [comments](#comments)
	* [atRules](#atrules)
	* [rules](#rules)
	* [selectors](#selectors)
	* [selectorsUsage](#selectorsusage)
	* [selectorComplexityThreshold](#selectorcomplexitythreshold)
	* [specificityGraph](#specificitygraph)
	* [declarations](#declarations)
	* [uniqueDeclarationsList](#uniquedeclarationslist)
	* [properties](#properties)
	* [engineTriggerProperties](#enginetriggerproperties)
	* [performanceHacks](#performancehacks)
	* [displays](#displays)
	* [positions](#positions)
	* [zIndices](#zindices)
	* [floats](#floats)
	* [borderRadiuses](#borderradiuses)
	* [widths](#widths)
	* [heights](#heights)
	* [letterSpacings](#letterspacings)
	* [fonts](#fonts)
	* [colors](#colors)
	* [backgroundColors](#backgroundcolors)
	* [allColors](#allcolors)
	* [transitionsAndAnimations](#transitionsandanimations)
	* [functions](#functions)
	* [filters](#filters)
	* [gradients](#gradients)
	* [units](#units)
	* [variables](#variables)
	* [dataUris](#datauris)
	* [browserHacks](#browserhacks)

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

// Switching off some metrics
const report = scancss(
	stylesheet,
	{
		atRules: false,
		selectorsUsage: false,
		dataUris: false,
	}
);
```

**_NOTE:_** Without provided options object `scancss` will use defaults. See available [Options](#options).

[Back to top](#table-of-contents)

## Report Structure

See [Report Structure](https://github.com/everget/scancss/tree/master/REPORT_STRUCTURE.md) for more details.

[Back to top](#table-of-contents)

## Examples

See [examples](https://github.com/everget/scancss/tree/master/examples) folder with stylesheets and their corresponding reports.

[Back to top](#table-of-contents)

## Options

#### stylesheetSize

Use this flag to fill `.styleSheetSize` metric

* Default: `true`

#### comments

Use this flag to fill `.comments` metric

* Default: `true`

#### atRules

Use this flag to fill `.atRules`, `.mediaQueries`, `.keyframes`, `.imports` metrics

* **_NOTE:_** Disabling this flag you will disable counting browser hacks in @supports and @media at-rules

* Default: `true`

#### rules

Use this flag to fill `.rules` and `.selectors` metrics

* **_NOTE:_** Disabling this flag you will disable counting all `.selectors` metrics

* Default: `true`

#### selectors

Use this flag to fill `.selectors` metric

* **_NOTE:_** Disabling this flag you will disable counting all `.selectors` metrics

* Default: `true`

#### selectorsUsage

Use this flag to fill `.selectors.usage` metric

* Default: `true`

#### attributesUsage

Use this flag to fill `.selectors.attributesUsage` metric

* Default: `true`

#### selectorComplexityThreshold

Use this value to set a threshold of the base parts of a selector to consider the selector as complex and to count in `.selectors.complex` metric

* Default: `4`

#### specificityGraph

Use this flag to fill `.selectors.specificity.graphData` metric

* Default: `false`

#### declarations

Use this flag to fill `.declarations` metric

* **_NOTE:_** Disabling this flag you will disable counting all `.declarations` metrics

* Default: `true`

#### uniqueDeclarationsList

Use this flag to fill `.declarations.list` metric

* Default: `false`

#### properties

Use this flag to fill `.properties` metric

* **_NOTE:_** Disabling this flag you will disable counting `.properties.engineTriggers` and `.properties.performanceHacks`

* Default: `true`

#### engineTriggerProperties

Use this flag to fill `.properties.engineTriggers` metric

* Default: `true`

#### performanceHacks

Use this flag to fill `.properties.performanceHacks` metric

* Default: `true`

#### displays

Use this flag to fill `.displays` metric

* Default: `true`

#### positions

Use this flag to fill `.positions` metric

* Default: `true`

#### zIndices

Use this flag to fill `.zIndices` metric

* Default: `true`

#### floats

Use this flag to fill `.floats` metric

* Default: `true`

#### borderRadiuses

Use this flag to fill `.borderRadiuses` metric

* Default: `true`

#### widths

Use this flag to fill `.widths` metric

* Default: `true`

#### heights

Use this flag to fill `.heights` metric

* Default: `true`

#### letterSpacings

Use this flag to fill `.letterSpacings` metric

* Default: `true`

#### fonts

Use this flag to fill `.fontSizes`, `.lineHeights`, `.fontFamilies` metrics

* Default: `true`

#### colors

Use this flag to fill `.colors` metric

* Default: `true`

#### backgroundColors

Use this flag to fill `.backgroundColors` metric

* Default: `true`

#### allColors

Use this flag to fill `.allColors` metric

* Default: `true`

#### transitionsAndAnimations

Use this flag to fill `.transitions` and `.animations` metrics

* Default: `true`

#### functions

Use this flag to fill `.functions` metric

* **_NOTE:_** Disabling this flag you will disable counting `.gradients`, `.filters`, `.dataUris`, cubic-beziers for `.transitions` and `.animations` metrics

* Default: `true`

#### filters

Use this flag to fill `.filters` metric

#### gradients

Use this flag to fill `.gradients` metric

* Default: `true`

#### units

Use this flag to fill `.units` metric

* **_NOTE:_** Disabling this flag you will disable counting `.properties.negativeMargins` metric

* Default: `true`

#### variables

Use this flag to fill `.variables` metric

* Default: `true`

#### dataUris

Use this flag to fill `.dataUris` metric

* Default: `true`

#### browserHacks

Use this flag to fill `.browserHacks` metric

* Default: `true`

[Back to top](#table-of-contents)

## License

MIT © Alex Orekhov @everget

[Back to top](#table-of-contents)
