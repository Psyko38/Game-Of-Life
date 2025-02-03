function createMatrix(rows, cols, initialValue = 0) {
	return Array.from({ length: rows }, () => Array(cols).fill(initialValue));
}

function searchMatrix(row, cols, replace) {
	if (replace == "") {
		return matrice[row][cols];
	} else {
		matrice[row][cols] = replace;
	}
	return;
}

let matrice = createMatrix(5, 5, 0);
console.log(matrice);

searchMatrix(0, 0, 1);
searchMatrix(0, 1, 1);
searchMatrix(1, 0, 1);
searchMatrix(1, 1, 1);
searchMatrix(2, 2, 1);
searchMatrix(3, 3, 1);

function Test(x, y) {
	let x1 = x;
	let y1 = y;
	let info = [];
	for (let i = 0; i < 9; i++) {
		info.push(x1, y1);
		y1++;
		if ((i + 1) % 3 == 0) {
			y1 = y;
			x1++;
		}
	}
	return info;
}

Death(5, 5);

function Death(rows, cols) {
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {}
	}
}
