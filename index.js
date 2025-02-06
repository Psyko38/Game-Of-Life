const canevas = document.getElementById("Gride");
canevas.width = innerWidth / 1.1;
canevas.height = innerHeight / 1.5;
ctx = canevas.getContext("2d");
MatrixHeight = 100;
MatrixWidth = 500;
BoxB = 2;
boxS = (innerHeight - BoxB) / MatrixHeight / 1.5;

DefaultTime = 2000;

let matrice = [];
let time = 0;
let OnOFF = 0;
let isMouseDown = false;

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
    if (
      newRow >= 0 &&
      newRow < matrice.length &&
      newCol >= 0 &&
      newCol < matrice[0].length &&
      matrice[newRow][newCol] === 1
    ) {
      count++;
    }
  }

  return count;
}

function cloneMatrix(matrice) {
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
  matrice = EditMatrix1(cloneMatrix(matrice));
  DisplayMatrix(boxS, BoxB, MatrixWidth, MatrixHeight);
}
function Setup() {
  matrice = createMatrix(MatrixHeight, MatrixWidth, 0);
  DisplayMatrix(boxS, BoxB, MatrixWidth, MatrixHeight);
  loop();
}

function DisplayMatrix(Box, border, W, H) {
  ctx.clearRect(0, 0, canevas.width, canevas.height);
  for (let x = 0; x < W; x++) {
    for (let y = 0; y < H; y++) {
      ctx.fillStyle = "rgb(76, 76, 76)";
      ctx.fillRect(x * Box, y * Box, Box, Box);
      if (matrice[y][x] == 1) {
        ctx.fillStyle = "rgb(0,255,0)";
      } else {
        ctx.fillStyle = "rgb(0, 0, 0)";
      }

      ctx.fillRect(
        x * Box + border / 2,
        y * Box + border / 2,
        Box - border,
        Box - border
      );
    }
  }
}

const rect = canevas.getBoundingClientRect();
const canevasX = rect.left;
const canevasY = rect.top;

document.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

let XY = 0;

document.addEventListener("mousemove", (event) => {
  if (isMouseDown) {
    const x = Math.floor((event.clientX - canevasX) / boxS);
    const y = Math.floor((event.clientY - canevasY) / boxS);
    if (x + "" + y != XY) {
      XY = x + "" + y;
      if (matrice[y][x] == 1) {
        matrice[y][x] = 0;
      } else {
        matrice[y][x] = 1;
      }
    }

    DisplayMatrix(boxS, BoxB, MatrixWidth, MatrixHeight);
  }
});

document.addEventListener("mousedown", (event) => {
  const x = Math.floor((event.clientX - canevasX) / boxS);
  const y = Math.floor((event.clientY - canevasY) / boxS);
  if (matrice[y][x] == 1) {
    matrice[y][x] = 0;
  } else {
    matrice[y][x] = 1;
  }

  DisplayMatrix(boxS, BoxB, MatrixWidth, MatrixHeight);
});

const RunBTN = document.getElementById("run");
RunBTN.addEventListener("click", function (event) {
  if (OnOFF == 1) {
    OnOFF = 0;
    RunBTN.innerText = "Start";
  } else {
    OnOFF = 1;
    RunBTN.innerText = "Pause";
  }
});

const rangeInput = document.getElementById("speed");
rangeInput.addEventListener("input", function () {
  const rangeValue = rangeInput.value;
  time = DefaultTime / rangeValue;
});

function loop() {
  if (OnOFF == 1) {
    iterate();
  }
  setTimeout(loop, time);
}

Setup();
