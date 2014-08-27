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
		var size = 40;
		var height = 40;
		// side 1
		if (isSidePolygonFrontFace([x + 1, y, z], [x + 1, y + 1, z])) {
			canvas.fillStyle    = grayScale(180 + (x + y) % 2 * 20 - (x + y) % 3 * 8);  // gray
			canvas.strokeStyle = canvas.fillStyle;
			drawProjectedPolygon([
				[x + 1, y, z], [x + 1, y + 1, z], [x + 1, y + 1, bottom], [x + 1, y, bottom]
			]);
		}
		// side 2
		if (isSidePolygonFrontFace([x + 1, y + 1, z], [x, y + 1, z])) {
			canvas.fillStyle    = grayScale(160 + (x + y) % 2 * 20 - (x + y) % 3 * 8);  // gray
			canvas.strokeStyle = canvas.fillStyle;
			drawProjectedPolygon([
				[x + 1, y + 1, z], [x, y + 1, z], [x, y + 1, bottom], [x + 1, y + 1, bottom]
			]);
		}
		// side 3
		if (isSidePolygonFrontFace([x, y + 1, z], [x, y, z])) {
			canvas.fillStyle    = grayScale(180 + (x + y) % 2 * 20 - (x + y) % 3 * 8);  // gray
			canvas.strokeStyle = canvas.fillStyle;
			drawProjectedPolygon([
				[x, y + 1, z], [x, y, z], [x, y, bottom], [x, y + 1, bottom]
			]);
		}
		// side 4
		if (isSidePolygonFrontFace([x, y, z], [x + 1, y, z])) {
			canvas.fillStyle    = grayScale(160 + (x + y) % 2 * 20 - (x + y) % 3 * 8);  // gray
			canvas.strokeStyle = canvas.fillStyle;
			drawProjectedPolygon([
				[x, y, z], [x + 1, y, z], [x + 1, y, bottom], [x, y, bottom]
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
			[x, y, z], [x + 1, y, z],
			[x + 1, y + 1, z], [x, y + 1, z]
		]);
	}