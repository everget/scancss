export function handleComment(comment, report) {
	report.comments.total++;

	const commentLength = Buffer.byteLength(comment.toString(), 'utf8');

	report.comments.length.total += commentLength;

	if (report.comments.length.longest < commentLength) {
		report.comments.length.longest = commentLength;
	}

	if (report.comments.length.shortest > commentLength) {
		report.comments.length.shortest = commentLength;
	}
}
