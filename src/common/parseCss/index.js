import postcss from 'postcss';
import { default as safeParser } from 'postcss-safe-parser';

export function parseCss(src) {
	return postcss.parse(
		postcss().process(src, { parser: safeParser }).root
	);
}
