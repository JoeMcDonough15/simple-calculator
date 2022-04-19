const NUMS = ".0123456789";
const OPERATORS = "+-*/=Enter";
const clearButton = document.getElementById("clear");
const numberButtons = document.querySelectorAll(".btn__num");
const operatorButtons = document.querySelectorAll(".btn__operator");
const displayNum = document.getElementById("display-text");

let numOfOperators = 0;
let answer = 0;
let currentNum = "";
let previousOperator = "";

/// click event listeners

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    currentNum += e.target.innerText;
    updateDisplay(currentNum);
  });
});

clearButton.addEventListener("click", () => {
  clear();
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    updateDisplay(calculate());
    previousOperator = e.target.innerText;
  });
});

/// keydown event listeners

document.addEventListener("keydown", (e) => {
  if (NUMS.includes(e.key)) {
    currentNum += e.key;
    updateDisplay(currentNum);
  } else if (OPERATORS.includes(e.key)) {
    updateDisplay(calculate());
    previousOperator = e.key;
  } else if (e.key === "Escape") {
    clear();
  }
});

// functions

function clear() {
  currentNum = "";
  answer = 0;
  previousOperator = "";
  numOfOperators = 0;
  updateDisplay(answer);
}

function updateDisplay(num) {
  displayNum.innerText = num.toString();
}

function calculate() {
  numOfOperators++;
  if (numOfOperators < 2) {
    answer = Number(currentNum);
    currentNum = "";
  } else {
    switch (previousOperator) {
      case "➕":
      case "+":
        answer += Number(currentNum);
        break;
      case "➖":
      case "-":
        answer -= Number(currentNum);
        break;
      case "✖️":
      case "x":
      case "X":
      case "*":
        answer *= Number(currentNum);
        break;
      case "➗":
      case "/":
        answer /= Number(currentNum);
        break;
      default:
        console.log("default");
    }
    currentNum = "";
  }
  return answer;
}
