import { reImageDataUri } from '.';

describe('Module: reImageDataUri', () => {
	describe('Positives', () => {
		describe('Matching data URIs with base64', () => {
			const dataUris = [
				'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUCBMQiB0UjIQA7',
				'data:image/png;base64,TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0',
				'data:image/jpeg;base64,aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1',
				'data:image/bmp;base64,c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0',
				'data:image/webp;base64,aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdl',
				'data:image/svg+xml;base64,LCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=',
				'data:image/pjpeg;base64,aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdl',
				'data:image/tiff;base64,aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdl',
				'data:image/x-icon;base64,aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdl',
			];

			dataUris.forEach((uri) => {
				it(`should match ${uri}`, () => {
					expect(uri.match(reImageDataUri)[0]).toBe(uri);
				});
			});
		});

		describe('Matching data URIs with SVG source', () => {
			const dataUris = [
				'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M224 387.814V512L32 320l192-192v126.912C447.375 260.152 437.794 103.016 380.93 0 521.287 151.707 491.48 394.785 224 387.814z"/></svg>',
				`data:image/svg+xml,\
					<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25">\
							<rect x="50" width="50" height="50" /> \
							<rect y="50" width="50" height="50" /> \
					</svg>
				`,
				`data:image/svg+xml,<svg xmlns="http:%2F%2Fwww.w3.org%2F2000%2Fsvg" width="30" height="30"> \
					<circle cx="5" cy="5" r="5" fill="#ab4"%2F><circle cx="15" cy="5" r="5" fill=" #655"%2F> \
					<circle cx="25" cy="5" r="5" fill="#e07"%2F><circle cx="5" cy="15" r="5" fill=" #655"%2F> \
					<circle cx="15" cy="15" r="5" fill="hsl(15, 25%, 75%)"%2F> \
					<circle cx="25" cy="15" r="5" fill=" #655"%2F><circle cx="5" cy="25" r="5" fill="#fb3"%2F> \
					<circle cx="15" cy="25" r="5" fill=" #655"%2F><circle cx="25" cy="25" r="5" fill="#58a"%2F><%2Fsvg>
				`,
				`data:image/svg+xml, \
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 65"> \
						<path fill="#1A374D" d="M42 27v-20c0-3.7-3.3-7-7-7s-7 3.3-7 7v21l12 15-7 15.7c14.5 13.9 35 2.8 35-13.7 0-13.3-13.4-21.8-26-18zm6 25c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/><path d="M14 27v-20c0-3.7-3.3-7-7-7s-7 3.3-7 7v41c0 8.2 9.2 17 20 17s20-9.2 20-20c0-13.3-13.4-21.8-26-18zm6 25c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/> \
					</svg>
				`,
			];

			dataUris.forEach((uri) => {
				it(`should match ${uri}`, () => {
					expect(uri.match(reImageDataUri)[0]).toBe(uri);
				});
			});
		});
	});
});
