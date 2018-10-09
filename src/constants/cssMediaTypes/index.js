import { cssDeprecatedMediaTypes } from '../cssDeprecatedMediaTypes';

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Media_types
 * https://drafts.csswg.org/mediaqueries-4/#media-types
 * https://drafts.csswg.org/mediaqueries/#media-types
 *
 * `all`        - Used for all media type devices
 * `print`      - Used for printers
 * `screen`     - Used for computer screens
 * `speech`     - Used for speech and sound synthesizers
 */

export const cssMediaTypes = [
	'all',
	'print',
	'screen',
	'speech',
	// '3d-glasses',
	...cssDeprecatedMediaTypes,
];
