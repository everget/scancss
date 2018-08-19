/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties
 * https://www.w3.org/TR/CSS2/about.html#shorthand
 */

export const cssShorthandPropertiesMap = {
	/**
	 * CSS 2.1: https://www.w3.org/TR/CSS2/propidx.html
	 */
	'list-style': [
		'list-style-type',
		'list-style-position',
		'list-style-image',
	],
	margin: [
		'margin-top',
		'margin-right',
		'margin-bottom',
		'margin-left',
	],
	outline: [
		'outline-width',
		'outline-style',
		'outline-color',
	],
	padding: [
		'padding-top',
		'padding-right',
		'padding-bottom',
		'padding-left',
	],
	/**
	 * CSS Backgrounds and Borders Module Level 3: https://www.w3.org/TR/css3-background/
	 */
	background: [
		'background-image',
		'background-position',
		'background-size',
		'background-repeat',
		'background-origin',
		'background-clip',
		'background-attachment',
		'background-color',
	],
	'background-position': [
		'background-position-x',
		'background-position-y',
	],
	border: [
		'border-width',
		'border-style',
		'border-color',
	],
	'border-color': [
		'border-top-color',
		'border-right-color',
		'border-bottom-color',
		'border-left-color',
	],
	'border-style': [
		'border-top-style',
		'border-right-style',
		'border-bottom-style',
		'border-left-style',
	],
	'border-width': [
		'border-top-width',
		'border-right-width',
		'border-bottom-width',
		'border-left-width',
	],
	'border-top': [
		'border-top-width',
		'border-top-style',
		'border-top-color',
	],
	'border-right': [
		'border-right-width',
		'border-right-style',
		'border-right-color',
	],
	'border-bottom': [
		'border-bottom-width',
		'border-bottom-style',
		'border-bottom-color',
	],
	'border-left': [
		'border-left-width',
		'border-left-style',
		'border-left-color',
	],
	'border-radius': [
		'border-top-left-radius',
		'border-top-right-radius',
		'border-bottom-right-radius',
		'border-bottom-left-radius',
	],
	'border-image': [
		'border-image-source',
		'border-image-slice',
		'border-image-width',
		'border-image-outset',
		'border-image-repeat',
	],
	'border-block-end': [
		'border-block-end-width',
		'border-block-end-style',
		'border-block-end-color',
	],
	'border-block-start': [
		'border-block-start-width',
		'border-block-start-style',
		'border-block-start-color',
	],
	'border-inline-end': [
		'border-inline-end-width',
		'border-inline-end-style',
		'border-inline-end-color',
	],
	'border-inline-start': [
		'border-inline-start-width',
		'border-inline-start-style',
		'border-inline-start-color',
	],
	/**
	 * CSS Multi-column Layout Module: https://www.w3.org/TR/css3-multicol/
	 */
	columns: [
		'column-width',
		'column-count',
	],
	'column-rule': [
		'column-rule-width',
		'column-rule-style',
		'column-rule-color',
	],
	/**
	 * CSS Fonts Module Level 3: https://www.w3.org/TR/css3-fonts/
	 */
	font: [
		'font-style',
		'font-variant',
		'font-weight',
		'font-stretch',
		'font-size',
		'line-height',
		'font-family',
	],
	'font-variant': [
		'font-variant-ligatures',
		'font-variant-alternates',
		'font-variant-caps',
		'font-variant-numeric',
		'font-variant-east-asian',
	],
	/**
	 * CSS Flexible Box Layout Module Level 1: https://www.w3.org/TR/css3-flexbox-1/
	 */
	flex: [
		'flex-grow',
		'flex-shrink',
		'flex-basis',
	],
	'flex-flow': [
		'flex-direction',
		'flex-wrap',
	],
	/**
	 * CSS Grid Layout Module Level 1: https://www.w3.org/TR/css-grid-1/
	 */
	grid: [
		'grid-template-rows',
		'grid-template-columns',
		'grid-template-areas',
		'grid-auto-rows',
		'grid-auto-columns',
		'grid-auto-flow',
	],
	'grid-template': [
		'grid-template-rows',
		'grid-template-columns',
		'grid-template-areas',
	],
	'grid-row': [
		'grid-row-start',
		'grid-row-end',
	],
	'grid-column': [
		'grid-column-start',
		'grid-column-end',
	],
	'grid-area': [
		'grid-row-start',
		'grid-column-start',
		'grid-row-end',
		'grid-column-end',
	],
	'grid-gap': [
		'grid-row-gap',
		'grid-column-gap',
	],
	/**
	 * CSS Masking Module Level 1: https://www.w3.org/TR/css-masking/
	 */
	mask: [
		'mask-image',
		'mask-mode',
		'mask-position',
		'mask-size',
		'mask-repeat',
		'mask-origin',
		'mask-clip',
		'mask-composite',
	],
	'mask-border': [
		'mask-border-source',
		'mask-border-slice',
		'mask-border-width',
		'mask-border-outset',
		'mask-border-repeat',
		'mask-border-mode',
	],
	/**
	 * Motion Path Module Level 1: https://drafts.fxtf.org/motion-1/
	 */
	offset: [
		'offset-position',
		'offset-path',
		'offset-distance',
		'offset-anchor',
		'offset-rotate',
	],
	/**
	 * CSS Overflow Module Level 3: https://drafts.csswg.org/css-overflow-3/
	 */
	overflow: [
		'overflow-x',
		'overflow-y',
	],
	/**
	 * https://wicg.github.io/overscroll-behavior/
	 */
	'overscroll-behavior': [
		'overscroll-behavior-x',
		'overscroll-behavior-y',
	],
	/**
	 * CSS Box Alignment Module Level 3: https://drafts.csswg.org/css-align-3/
	 */
	'place-content': [
		'align-content',
		'justify-content',
	],
	'place-items': [
		'align-items',
		'justify-items',
	],
	'place-self': [
		'align-self',
		'justify-self',
	],
	/**
	 * CSS Scroll Snap Module Level 1: https://www.w3.org/TR/css-scroll-snap-1/
	 */
	'scroll-padding': [
		'scroll-padding-top',
		'scroll-padding-right',
		'scroll-padding-bottom',
		'scroll-padding-left',
	],
	'scroll-padding-block': [
		'scroll-padding-block-start',
		'scroll-padding-block-end',
	],
	'scroll-padding-inline': [
		'scroll-padding-inline-start',
		'scroll-padding-inline-end',
	],
	'scroll-snap-margin': [
		'scroll-snap-margin-top',
		'scroll-snap-margin-right',
		'scroll-snap-margin-bottom',
		'scroll-snap-margin-left',
	],
	'scroll-snap-margin-block': [
		'scroll-snap-margin-block-start',
		'scroll-snap-margin-block-end',
	],
	'scroll-snap-margin-inline': [
		'scroll-snap-margin-inline-start',
		'scroll-snap-margin-inline-end',
	],
	/**
	 * CSS Speech Module: https://www.w3.org/TR/css3-speech/
	 */
	cue: [
		'cue-before',
		'cue-after',
	],
	pause: [
		'pause-before',
		'pause-after',
	],
	rest: [
		'rest-before',
		'rest-after',
	],
	/**
	 * CSS Text Decoration Module Level 3: https://www.w3.org/TR/css-text-decor-3/
	 */
	'text-decoration': [
		'text-decoration-line',
		'text-decoration-style',
		'text-decoration-color',
	],
	'text-emphasis': [
		'text-emphasis-style',
		'text-emphasis-color',
	],
	/**
	 * CSS Animations: https://www.w3.org/TR/css3-animations
	 */
	animation: [
		'animation-name',
		'animation-duration',
		'animation-timing-function',
		'animation-delay',
		'animation-iteration-count',
		'animation-direction',
		'animation-fill-mode',
		'animation-play-state',
	],
	/**
	 * CSS Transitions: https://www.w3.org/TR/css3-transitions/
	 */
	transition: [
		'transition-property',
		'transition-duration',
		'transition-timing-function',
		'transition-delay',
	],
};
