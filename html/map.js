var map = [	1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
			1,2,1,0,0,1,0,0,0,1,1,0,0,1,0,0,
			1,3,2,1,1,0,0,0,1,1,1,0,1,0,0,0,
			1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,
			0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
			0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,
			0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,
			1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,
			2,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
			3,1,1,0,0,1,0,0,0,1,1,0,0,1,0,0,
			3,3,2,0,1,0,0,0,1,1,1,0,1,0,0,0,
			4,3,2,1,1,1,0,0,0,0,0,1,1,1,0,0,
			4,3,2,0,0,0,0,0,0,1,0,0,0,0,0,0,
			6,3,3,1,0,0,0,0,0,0,0,1,0,0,0,0,
			5,3,3,2,1,1,0,0,0,0,1,1,1,0,0,0,
			4,3,3,2,0,1,0,0,0,0,0,1,0,0,0,0];

function cell(x, y) {
	if (x > 16) {
		x -= 16;
	}
	if (x < 0 || y < 0 || x >= 16 || y >= 16) {
		return (((x + y) % 3) % 2) * 0.5;
	}
	return map[x * 16 + y] * 0.5;
}

function grayScale(a) {
	return 'rgba(' + a + ',' + a + ',' + a +',1)';  // white
}

function isSidePolygonFrontFace(pointA, pointB) {
	coordA = toScreenSpace(pointA);
	coordB = toScreenSpace(pointB);
	return coordA[0] < coordB[0];
}

function drawMapTile(x, y, z, bottom) {
	var point = [
		[x, y, z], [x + 1, y, z],
		[x + 1, y + 1, z], [x, y + 1, z], // top
		[x, y, bottom], [x + 1, y, bottom],
		[x + 1, y + 1, bottom], [x, y + 1, bottom] // bottom
	]
	// side 1
	if (isSidePolygonFrontFace(point[1], point[2])) {
		canvas.fillStyle    = grayScale(180 + (x + y) % 2 * 20 - (x + y) % 3 * 8);  // gray
		canvas.strokeStyle = canvas.fillStyle;
		drawProjectedPolygon([
			point[1], point[2], point[6], point[5]
		]);
	}
	// side 2
	if (isSidePolygonFrontFace([x + 1, y + 1, z], [x, y + 1, z])) {
		canvas.fillStyle    = grayScale(160 + (x + y) % 2 * 20 - (x + y) % 3 * 8);  // gray
		canvas.strokeStyle = canvas.fillStyle;
		drawProjectedPolygon([
			point[2], point[3], point[7], point[6]
		]);
	}
	// side 3
	if (isSidePolygonFrontFace([x, y + 1, z], [x, y, z])) {
		canvas.fillStyle    = grayScale(180 + (x + y) % 2 * 20 - (x + y) % 3 * 8);  // gray
		canvas.strokeStyle = canvas.fillStyle;
		drawProjectedPolygon([
			point[3], point[0], point[4], point[7]
		]);
	}
	// side 4
	if (isSidePolygonFrontFace([x, y, z], [x + 1, y, z])) {
		canvas.fillStyle    = grayScale(160 + (x + y) % 2 * 20 - (x + y) % 3 * 8);  // gray
		canvas.strokeStyle = canvas.fillStyle;
		drawProjectedPolygon([
			point[0], point[1], point[5], point[4]
		]);
	}
	// top
	if ((x + y) % 2 > 0.5) {
		canvas.fillStyle    = grayScale(240 + z * 10);  // gray
	} else {
		canvas.fillStyle    = grayScale(230 + z * 10);  // gray
	}
	canvas.strokeStyle = canvas.fillStyle;
	drawProjectedPolygon([
		point[0], point[1], point[2], point[3]
	]);
}