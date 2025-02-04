function createMatrix(rows, cols, initialValue = 0) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push(initialValue);
        }
        matrix.push(row);
    }
    return matrix;
}

function searchMatrix(row, cols, replace) {
    if (replace === undefined) {
        return matrice[row][cols];
    } else {
        matrice[row][cols] = replace;
    }
    return;
}

let matrice = createMatrix(5, 5, 0);
console.log(matrice);

searchMatrix(1, 1, 1);
searchMatrix(1, 2, 1);
searchMatrix(2, 1, 1);
searchMatrix(2, 2, 1);
searchMatrix(3, 3, 1);
searchMatrix(4, 4, 1);

function checkGrid3x3(row, col) {
    let count = 0;
    let directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];
    for (let i = 0; i < directions.length; i++) {
        let newRow = row + directions[i][0];
        let newCol = col + directions[i][1];
        if (newRow >= 0) {
            if (newRow < matrice.length) {
                if (newCol >= 0) {
                    if (newCol < matrice[0].length) {
                        if (matrice[newRow][newCol] === 1) {
                            count++;
                        }
                    }
                }
            }
        }
    }

    return count;
}

function cloneMatrix() {
    let clonedMatrice = createMatrix(matrice.length, matrice[0].length, 0);
    for (let i = 0; i < matrice.length; i++) {
        for (let j = 0; j < matrice[i].length; j++) {
            clonedMatrice[i][j] = matrice[i][j];
        }
    }
    return clonedMatrice;
}

function replaceMatrix(Matrice) {
    matrice = Matrice;
}

function EditMatrix1(Matrice) {
    for (let i = 0; i < Matrice.length; i++) {
        for (let j = 0; j < Matrice[i].length; j++) {
            let TrueConte = checkGrid3x3(i, j);
            if (TrueConte === 3) {
                Matrice[i][j] = 1;
            }
            if (TrueConte < 2 || TrueConte > 3) {
                Matrice[i][j] = 0;
            }
        }
    }
    return Matrice;
}

function iterate() {
    let EditMatrix = cloneMatrix();
    EditMatrix = EditMatrix1(EditMatrix);
    replaceMatrix(EditMatrix);
    console.log(matrice);
}

iterate();
