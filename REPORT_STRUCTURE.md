## Report Structure

* [styleSheetSize](#stylesheetsize)
* [comments](#comments)
* [atRules](#atrules)
* [imports](#imports)
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
* [widths](#widths)
* [heights](#heights)
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
* [filters](#filters)
* [gradients](#gradients)
* [dataUris](#datauris)
* [units](#units)
* [variables](#variables)
* [vendorPrefixes](#vendorprefixes)
* [browserHacks](#browserhacks)

#### styleSheetSize

* **source** - `number`

* **gzipSource** - `number`

[Back to top](#report-structure)

#### comments

* **total** - `number`

* **length** - `Record<string, number>`
	* **total** - `number`
	* **longest** - `number`
	* **shortest** - `number` (`Number.MAX_SAFE_INTEGER` if there are no comments in a stylesheet)
	* **average** - `number`

* **sizeRatio** - `number`

* **sizeRatioPercent** - `string | null`

[Back to top](#report-structure)

#### atRules

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **empty** - `number`

* **prefixed** - `number`

* **unknown** - `Record<string, any>`
	* **total** - `number`
	* **unique** - `number`
	* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### imports

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **urls** - `Record<string, number>`

[Back to top](#report-structure)

#### mediaQueries

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **onlyKeyword** - `number`

* **types** - `Record<string, any>`
	* **total** - `number`
	* **unique** - `number`
	* **usage** - `Record<string, number>`

* **features** - `Record<string, any>`
	* **total** - `number`
	* **unique** - `number`
	* **prefixed** - `number`
	* **deprecated** - `Record<string, any>`
		* **total** - `number`
		* **unique** - `number`
		* **usage** - `Record<string, number>`
	* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### keyframes

* **stepsChains** - `Record<string, number>`

* **longestStepsChain** - `string | null`

* **longestStepsChainLength** - `number`

* **longestStepsChainAnimation** - `string | null`

* **shortestStepsChain** - `string | null`

* **shortestStepsChainLength** - `number` (`Number.MAX_SAFE_INTEGER` if there are no @keyframes in a stylesheet)

* **shortestStepsChainAnimation** - `string | null`

* **animatableProperties** - `Array<string>`

* **definedAnimations** - `Array<string>`

[Back to top](#report-structure)

#### rules

* **total** - `number`

* **empty** - `number`

* **withoutTrailingSemicolon** - `number`

[Back to top](#report-structure)

#### selectors

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **baseUsage** - `Record<string, number>`
	* **attribute** - `number`
	* **class** - `number`
	* **id** - `number`
	* **pseudoClass** - `number`
	* **pseudoElement** - `number`
	* **tag** - `number`
	* **universal** - `number`

* **pseudoClassesUsage** - `Record<string, number>`

* **pseudoElementsUsage** - `Record<string, number>`

* **attributesUsage** - `Record<string, number>`

* **combinators** - `Record<string, number>`
	* **total** - `number`
	* **adjacentSibling** - `number`
	* **child** - `number`
	* **descendant** - `number`
	* **generalSibling** - `number`

* **complex** - `number`

* **maxPerRule** - `number`

* **maxPerRuleList** - `Array<string>`

* **averagePerRule** - `number`

* **length** - `Record<string, number | null>`
	* **total** - `number`
	* **longest** - `number`
	* **longestSelector** - `string | null`
	* **average** - `number`

* **specificity** - `Record<string, any>`
	* **total** - `[number, number, number]`
	* **average** - `[number, number, number]`
	* **highest** - `[number, number, number]`
	* **highestSelector** - `string | null`
	* **highest10** - `Array<Record<'selector' | 'specificity', string | [number, number, number]>`
	* **graphData** - `Array<[number, number, number]>`

* **sizeRatio** - `number`

* **sizeRatioPercent** - `string | null`

[Back to top](#report-structure)

#### declarations

* **total** - `number`

* **unique** - `number`

* **uniqueRatio** - `number`

* **important** - `number`

* **averagePerRule** - `number`

* **length** - `Record<string, number | null>`
	* **total** - `number`
	* **longest** - `number`
	* **longestDeclaration** - `string | null`
	* **average** - `number`

* **sizeRatio** - `number`

* **sizeRatioPercent** - `string | null`

* **inAtRules** - `Record<string, number>`

* **list** - `Array<string>`

[Back to top](#report-structure)

#### properties

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **shorthands** - `number`

* **prefixed** - `number`

* **unitless** - `number`

* **resetsViaAll** - `number`

* **negativeMargins** - `number`

* **anonymousReplacedElements** - `number`

* **performanceHacks** - `Record<string, number>`

* **autoKeyword** - `number`

* **inheritKeyword** - `number`

* **initialKeyword** - `number`

* **revertKeyword** - `number`

* **unsetKeyword** - `number`

* **engineTriggers** - `Record<'composite' | 'layout' | 'paint', any>`
	* **composite** - `Record<string, number>`
		* **blink** - `number`
		* **edgehtml** - `number`
		* **gecko** - `number`
		* **webkit** - `number`
	* **layout** - `Record<string, number>`
		* **blink** - `number`
		* **edgehtml** - `number`
		* **gecko** - `number`
		* **webkit** - `number`
	* **paint** - `Record<string, number>`
		* **blink** - `number`
		* **edgehtml** - `number`
		* **gecko** - `number`
		* **webkit** - `number`

[Back to top](#report-structure)

#### displays

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### positions

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### zIndices

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **invalid** - `Record<string, number>`

[Back to top](#report-structure)

#### floats

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### borderRadiuses

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### widths

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### heights

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### letterSpacings

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### fontSizes

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **keywords** - `Record<string, number | Record<string, number>>`
	* **total** - `number`
	* **unique** - `number`
	* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### lineHeights

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **hardCoded** - `number`

[Back to top](#report-structure)

#### fontFamilies

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **generic** - `Record<string, number>`

* **system** - `Record<string, number>`

* **withoutFallbackFonts** - `number`

* **imageReplacementHacks** - `number`

[Back to top](#report-structure)

#### colors

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **currentColorKeyword** - `number`

* **transparentKeyword** - `number`

* **models** - `Record<'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hwb', number>`

* **named** - `Record<string, number>`

* **system** - `Record<string, number>`

[Back to top](#report-structure)

#### backgroundColors

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **currentColorKeyword** - `number`

* **transparentKeyword** - `number`

* **models** - `Record<'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hwb', number>`

* **named** - `Record<string, number>`

* **system** - `Record<string, number>`

[Back to top](#report-structure)

#### allColors

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **currentColorKeyword** - `number`

* **transparentKeyword** - `number`

* **models** - `Record<'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hwb', number>`

* **named** - `Record<string, number>`

* **system** - `Record<string, number>`

[Back to top](#report-structure)

#### transitions

* **properties** - `Record<string, number>`

* **longestDuration** - `number`

* **shortestDuration** - `number` (`Number.MAX_SAFE_INTEGER` if there are no transition durations in a stylesheet)

* **longestDelay** - `number`

* **shortestDelay** - `number` (`Number.MAX_SAFE_INTEGER` if there are no transition delays in a stylesheet)

* **timingFunctions** - `Record<string, number>`

* **invalidTimingFunctions** - `Record<string, number>`

[Back to top](#report-structure)

#### animations

* **total** - `number` (**_NOTE:_** total animation names)

* **unique** - `number` (**_NOTE:_** unique animation names)

* **usage** - `Record<string, number>` (**_NOTE:_** animation names usage)

* **infinite** - `number`

* **withoutDefinitions** - `Array<string>`

* **longestDuration** - `number`

* **shortestDuration** - `number` (`Number.MAX_SAFE_INTEGER` if there are no animation durations in a stylesheet)

* **longestDelay** - `number`

* **shortestDelay** - `number` (`Number.MAX_SAFE_INTEGER` if there are no animation delays in a stylesheet)

* **timingFunctions** - `Record<string, number>`

* **invalidTimingFunctions** - `Record<string, number>`

[Back to top](#report-structure)

#### functions

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **prefixed** - `number`

[Back to top](#report-structure)

#### filters

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### gradients

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### dataUris

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **length** - `Record<string, number | null>`
	* **total** - `number`
	* **longest** - `number`
	* **longestDataUri** - `string | null`
	* **average** - `number`

* **sizeRatio** - `number`

* **sizeRatioPercent** - `string | null`

[Back to top](#report-structure)

#### units

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **excessive** - `Record<string, any>`
	* **total** - `number`
	* **unique** - `number`
	* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### variables

* **total** - `number`

* **unique** - `number`

* **usage** - `Record<string, number>`

* **valuesMap** - `Record<string, number>`

[Back to top](#report-structure)

#### vendorPrefixes

* **total** - `number`

* **unique** - `number`

* **unknown** - `Record<string, any>`
	* **total** - `number`
	* **unique** - `number`
	* **usage** - `Record<string, number>`

* **usage** - `Record<string, number>`

[Back to top](#report-structure)

#### browserHacks

* **total** - `number`

* **usage** - `Record<string, any>`
	* **supports** - `Record<string, number>`
	* **media** - `Record<string, number>`

[Back to top](#report-structure)
