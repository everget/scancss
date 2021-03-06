export function getEmptyReport() {
	return {
		size: {
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
			sizeRatioPercent: null,
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
			descriptors: {
				total: 0,
				unique: 0,
				usage: {},
			},
			usage: {},
		},
		imports: {
			total: 0,
			unique: 0,
			usage: {},
			urls: {},
		},
		mediaQueries: {
			total: 0,
			unique: 0,
			onlyKeyword: 0,
			types: {
				total: 0,
				unique: 0,
				deprecated: {
					total: 0,
					unique: 0,
					usage: {},
				},
				usage: {},
			},
			features: {
				total: 0,
				unique: 0,
				prefixed: 0,
				deprecated: {
					total: 0,
					unique: 0,
					usage: {},
				},
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
			definedAnimations: [],
		},
		rules: {
			total: 0,
			empty: 0,
			withoutTrailingSemicolon: 0,
		},
		selectors: {
			total: 0,
			unique: 0,
			baseUsage: {
				attribute: 0,
				class: 0,
				id: 0,
				pseudoClass: 0,
				pseudoElement: 0,
				tag: 0,
				universal: 0,
			},
			pseudoClassesUsage: {},
			pseudoElementsUsage: {},
			attributesUsage: {},
			combinators: {
				total: 0,
				adjacentSibling: 0,
				child: 0,
				descendant: 0,
				generalSibling: 0,
			},
			complex: 0,
			maxPerRule: 0,
			maxPerRuleList: [],
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
				highest10: [],
				average: [0, 0, 0],
				graphData: [],
			},
			sizeRatio: 0,
			sizeRatioPercent: null,
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
			sizeRatioPercent: null,
			inAtRules: {},
			list: [],
		},
		properties: {
			total: 0,
			unique: 0,
			uniqueRatio: 0,
			shorthands: 0,
			shorthandsRatio: 0,
			prefixed: 0,
			unitless: 0,
			resetsViaAll: 0,
			negativeMargins: 0,
			anonymousReplacedElements: 0,
			performanceHacks: {},
			autoKeyword: 0,
			inheritKeyword: 0,
			initialKeyword: 0,
			revertKeyword: 0,
			unsetKeyword: 0,
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
		widths: {
			total: 0,
			unique: 0,
			usage: {},
		},
		heights: {
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
			models: {
				hex: 0,
				hexa: 0,
				rgb: 0,
				rgba: 0,
				hsl: 0,
				hsla: 0,
				hwb: 0,
			},
			named: {},
			system: {},
			usage: {},
		},
		backgroundColors: {
			total: 0,
			unique: 0,
			currentColorKeyword: 0,
			transparentKeyword: 0,
			models: {
				hex: 0,
				hexa: 0,
				rgb: 0,
				rgba: 0,
				hsl: 0,
				hsla: 0,
				hwb: 0,
			},
			named: {},
			system: {},
			usage: {},
		},
		allColors: {
			total: 0,
			unique: 0,
			currentColorKeyword: 0,
			transparentKeyword: 0,
			models: {
				hex: 0,
				hexa: 0,
				rgb: 0,
				rgba: 0,
				hsl: 0,
				hsla: 0,
				hwb: 0,
			},
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
			withoutDefinitions: [],
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
			sizeRatioPercent: null,
			usage: {},
		},
		units: {
			total: 0,
			unique: 0,
			excessive: {
				total: 0,
				unique: 0,
				usage: {},
			},
			unknown: {
				total: 0,
				unique: 0,
				usage: {},
			},
			usage: {},
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
}
