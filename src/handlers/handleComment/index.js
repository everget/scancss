export function handleComment(comment, report) {
	report.comments.total++;

	const commentLength = Buffer.byteLength(comment.toString(), 'utf8');

	report.comments.totalByteLength += commentLength;

	if (report.comments.longestByteLength < commentLength) {
		report.comments.longestByteLength = commentLength;
	}

	if (report.comments.shortestByteLength > commentLength) {
		report.comments.shortestByteLength = commentLength;
	}
}
