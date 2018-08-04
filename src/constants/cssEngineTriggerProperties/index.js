/**
 * https://github.com/GoogleChromeLabs/css-triggers
 */

const t = true;
const f = false;

export const cssEngineTriggerProperties = {
	'align-content': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: f,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'align-items': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'align-self': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'backface-visibility': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: f,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'background-attachment': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'background-blend-mode': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: null,
			paint: null,
			composite: null
		}
	},
	'background-clip': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'background-color': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'background-image': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'background-origin': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'background-position': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'background-repeat': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'background-size': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-bottom-color': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'border-bottom-left-radius': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-bottom-right-radius': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-bottom-style': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-bottom-width': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-collapse': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-image-outset': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-image-repeat': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-image-slice': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-image-source': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-image-width': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-left-color': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'border-left-style': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-left-width': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-right-color': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'border-right-style': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-right-width': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-top-color': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'border-top-left-radius': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-top-right-radius': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-top-style': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'border-top-width': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	bottom: {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'box-shadow': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'box-sizing': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	clear: {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	clip: {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	color: {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	cursor: {
		blink: {
			layout: f,
			paint: f,
			composite: t
		},
		gecko: {
			layout: f,
			paint: f,
			composite: t
		},
		webkit: {
			layout: f,
			paint: f,
			composite: f
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	direction: {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	display: {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'flex-basis': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'flex-direction': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'flex-grow': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'flex-shrink': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'flex-wrap': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	float: {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'font-family': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'font-kerning': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: f,
			composite: t
		}
	},
	'font-size': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'font-style': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: f,
			paint: f,
			composite: f
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'font-variant': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: f,
			paint: f,
			composite: f
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'font-variant-ligatures': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'font-weight': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	height: {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'justify-content': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: f,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	left: {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'letter-spacing': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'line-height': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'list-style-image': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: f,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'list-style-position': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'list-style-type': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'margin-bottom': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'margin-left': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'margin-right': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'margin-top': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'max-height': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'max-width': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'min-height': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'min-width': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: f,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	opacity: {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: f,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	order: {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	orphans: {
		blink: {
			layout: f,
			paint: f,
			composite: t
		},
		gecko: {
			layout: f,
			paint: f,
			composite: t
		},
		webkit: {
			layout: f,
			paint: f,
			composite: f
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'outline-color': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'outline-offset': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'outline-style': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'outline-width': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'overflow-x': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'overflow-y': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'padding-bottom': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'padding-left': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'padding-right': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'padding-top': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	perspective: {
		blink: {
			layout: f,
			paint: f,
			composite: t
		},
		gecko: {
			layout: f,
			paint: f,
			composite: t
		},
		webkit: {
			layout: f,
			paint: f,
			composite: f
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'perspective-origin': {
		blink: {
			layout: f,
			paint: f,
			composite: t
		},
		gecko: {
			layout: f,
			paint: f,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'pointer-events': {
		blink: {
			layout: f,
			paint: f,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: f,
			paint: f,
			composite: f
		},
		edgehtml: {
			layout: f,
			paint: f,
			composite: t
		}
	},
	position: {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	resize: {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: f,
			paint: f,
			composite: f
		},
		edgehtml: {
			layout: f,
			paint: f,
			composite: t
		}
	},
	right: {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'table-layout': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'text-align': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'text-decoration': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'text-indent': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'text-rendering': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'text-shadow': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
	'text-transform': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	top: {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	transform: {
		blink: {
			layout: f,
			paint: f,
			composite: t
		},
		gecko: {
			layout: f,
			paint: f,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'transform-origin': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: f,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'transform-style': {
		blink: {
			layout: f,
			paint: f,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'unicode-bidi': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: f,
			paint: f,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'vertical-align': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	visibility: {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'white-space': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	widows: {
		blink: {
			layout: f,
			paint: f,
			composite: t
		},
		gecko: {
			layout: f,
			paint: f,
			composite: t
		},
		webkit: {
			layout: f,
			paint: f,
			composite: f
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	width: {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'word-break': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'word-spacing': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'word-wrap': {
		blink: {
			layout: t,
			paint: t,
			composite: t
		},
		gecko: {
			layout: t,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: t,
			paint: t,
			composite: t
		}
	},
	'z-index': {
		blink: {
			layout: f,
			paint: t,
			composite: t
		},
		gecko: {
			layout: f,
			paint: t,
			composite: t
		},
		webkit: {
			layout: t,
			paint: t,
			composite: t
		},
		edgehtml: {
			layout: f,
			paint: t,
			composite: t
		}
	},
};
