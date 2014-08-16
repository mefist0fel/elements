// basic vector2[x, y] functons
function vAdd(av, bv) {
	return [av[0] + bv[0], av[1] + bv[1]];
}
function vSub(av, bv) {
	return [av[0] - bv[0], av[1] - bv[1]];
}
function magnitude(va, vb) {
	return Math.sqrt((va[0] - vb[0]) * (va[0] - vb[0]) + (va[1] - vb[1]) * (va[1] - vb[1]));
}
function vNorm(v) { // normilize
	return vMult(v, 1 / magnitude(v, [0, 0]));
}
function vMult(v, m) { // m - float
	return [v[0] * m, v[1] * m];
}
function vInRect(v, rect) { // rect is arr[4] description of AABB rect
	return (v[0] >= rect[0] && v[0] <= rect[2] && v[1] >= rect[1] && v[1] <= rect[3]);
}