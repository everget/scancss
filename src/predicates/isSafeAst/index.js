export function isSafeAst(ast) {
	return ast !== undefined &&
		Array.isArray(ast.nodes) &&
		ast.nodes[0] !== undefined &&
		Array.isArray(ast.nodes[0].nodes);
}
