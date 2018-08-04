// TODO: extend by selectors and properties
export const cssBrowserHacks = [
	{
		type: 'media',
		regex: /screen and \(min-width:\s*0\\0\)/g,
		targetBrowsers: [],
	},
	{
		type: 'media',
		regex: /screen and \(-moz-images-in-menus:\s*0\)/g,
		targetBrowsers: [],
	},
	{
		type: 'media',
		regex: /screen and \(min--moz-device-pixel-ratio:\s*0\)/g,
		targetBrowsers: [],
	},
	{
		type: 'media',
		regex: /all and \(min--moz-device-pixel-ratio:\s*0\) and \(min-resolution:\s*.001dpcm\)/g,
		targetBrowsers: [],
	},
	{
		type: 'media',
		regex: /all and \(-moz-images-in-menus:\s*0\) and \(min-resolution:\s*.001dpcm\)/g,
		targetBrowsers: [],
	},
	{
		type: 'media',
		regex: /all and \(min--moz-device-pixel-ratio:\s*0\) and \(min-resolution:\s*3e1dpcm\)/g,
		targetBrowsers: [],
	},
	{
		type: 'media',
		regex: /all and \(-webkit-min-device-pixel-ratio:\s*0\) and \(min-resolution:\s*.001dpcm\)/g,
		targetBrowsers: [],
	},
	{
		type: 'media',
		regex: /\\\\0 screen/g,
		targetBrowsers: [],
	},
	{
		type: 'media',
		regex: /\\0 all/g,
		targetBrowsers: [],
	},
	{
		type: 'media',
		regex: /\\0screen/g,
		targetBrowsers: [],
	},
	{
		type: 'media',
		regex: /screen\\9/g,
		targetBrowsers: [],
	},
	{
		type: 'media',
		regex: /\\0screen\\,screen\\9/g,
		targetBrowsers: [],
	},
	{
		type: 'supports',
		regex: /-webkit-appearance:\s*none/g,
		targetBrowsers: [],
	},
	{
		type: 'supports',
		regex: /-moz-appearance:\s*meterbar/g,
		targetBrowsers: [],
	},
];
