const canevas = document.getElementById("Gride");
canevas.width = innerWidth / 1.1;
canevas.height = innerHeight / 1.5;
ctx = canevas.getContext("2d");
MatrixHeight = 50;
MatrixWidth = 50;
BoxB = 2;
boxS = (innerHeight - BoxB) / MatrixHeight / 1.5;

const numberBTN = document.getElementById("number");
const OperationBTN = document.getElementById("Operation");
const LifeBTN = document.getElementById("Life");
const ruleContainer = document.querySelector('.RemoveRule');
const EditRule = document.getElementById("Rule");

DefaultTime = 2000;

let matrice = [];
let time = 0;
let OnOFF = 0;
let isMouseDown = false;

let Rule = [
  ["<", 2, 0],
  ["=", 3, 1],
  [">", 3, 0],
];

function EditMatrix1(Matrice) {
  for (let i = 0; i < Matrice.length; i++) {
    for (let j = 0; j < Matrice[i].length; j++) {
      const TrueConte = checkGrid3x3(i, j);
      for (const rule of Rule) {
        let condition = false;
        if (rule[0] === "<") {
          condition = TrueConte < rule[1];
        } else if (rule[0] === "=") {
          condition = TrueConte === rule[1];
        } else if (rule[0] === ">") {
          condition = TrueConte > rule[1];
        }
        if (condition) {
          Matrice[i][j] = rule[2];
          break;
        }
      }
    }
  }
  return Matrice;
}

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

function iterate() {
  matrice = EditMatrix1(cloneMatrix(matrice));
  DisplayMatrix(boxS, BoxB, MatrixWidth, MatrixHeight, matrice);
}
function Setup(OnOff) {
  matrice = createMatrix(MatrixHeight, MatrixWidth, 0);
  DisplayMatrix(boxS, BoxB, MatrixWidth, MatrixHeight, matrice);
  updateRulesDisplay();
  if (OnOff == 1) {
    loop();
  }
}

function DisplayMatrix(Box, border, W, H, matrice) {
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
    if (x >= 0 && x < MatrixWidth && y >= 0 && y < MatrixHeight && EditRule.style.display !== "unset") {
      if (x + "" + y != XY) {
        XY = x + "" + y;
        if (matrice[y][x] == 1) {
          matrice[y][x] = 0;
        } else {
          matrice[y][x] = 1;
        }
      }
      DisplayMatrix(boxS, BoxB, MatrixWidth, MatrixHeight, matrice);
    }
  }
});

document.addEventListener("mousedown", (event) => {
  const x = Math.floor((event.clientX - canevasX) / boxS);
  const y = Math.floor((event.clientY - canevasY) / boxS);
  if (x >= 0 && x < MatrixWidth && y >= 0 && y < MatrixHeight && EditRule.style.display !== "unset") {
    if (matrice[y][x] == 1) {
      matrice[y][x] = 0;
    } else {
      matrice[y][x] = 1;
    }
  
    DisplayMatrix(boxS, BoxB, MatrixWidth, MatrixHeight, matrice);
  }
  
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

function Ask() {
  MatrixHeight = prompt("Height of the grid", "50");
  MatrixWidth = prompt("Width of the grid", "50");
  boxS = (innerHeight - BoxB) / MatrixHeight / 1.5;
  Setup(0);
}

function addRule() {
  Rule.push([OperationBTN.value, Number(numberBTN.value), Number(LifeBTN.value)]);
  updateRulesDisplay();
}

function RemoveRule(ID) {
  Rule.splice(ID, 1);
  updateRulesDisplay();
}

function updateRulesDisplay() {
  ruleContainer.innerHTML = "";
  for (let index = 0; index < Rule.length; index++) {
    const rule = Rule[index];
    const ruleDiv = document.createElement("div");
    let operatorText = "";
    if (rule[0] === "<") {
      operatorText = "less than";
    } else if (rule[0] === "=") {
      operatorText = "equal to";
    } else if (rule[0] === ">") {
      operatorText = "greater than";
    }
    let cellState;
    if (rule[2] === 0) {
      cellState = "dead";
    } else {
      cellState = "alive";
    }
    ruleDiv.innerHTML = `<p>Rule ${index + 1}: If live neighbors count is ${operatorText} ${rule[1]}, then the cell becomes ${cellState}.</p>`;
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", function () {
      RemoveRule(index);
      updateRulesDisplay();
    });
    
    ruleDiv.appendChild(removeBtn);
    ruleContainer.appendChild(ruleDiv);
  }
}

function addRule() {
  Rule.push([
    OperationBTN.value, 
    Number(numberBTN.value), 
    Number(LifeBTN.value)
  ]);
  updateRulesDisplay();
}

function ShowRule() {
  if (EditRule.style.display === "unset") {
    EditRule.style.display = "none";
  } else {
  EditRule.style.display = "unset";
  }
}

Setup(1);