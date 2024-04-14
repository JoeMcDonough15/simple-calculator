//////// Constants ////////

const NUMS = "0123456789.";
const OPERATORS = "+÷-xX/*=Enter";
const HIGHER_ORDER_OPERATIONS = "Xx*÷/";
const LOWER_ORDER_OPERATIONS = "+-";
const MULTIPLIERS = "Xx*";
const DIVISION = "/÷";
const ADDITION = "+";
const SUBTRACTION = "-";
const EQUALS_OPERATORS = "=Enter";

const myCalculator = new Calculator();

//////// DOM Elements ////////

const calculatorShell = document.getElementById("calculator-shell");
const clearButton = document.getElementById("clear-button");
const numberButtons = document.querySelectorAll(".btn__num");
const operatorButtons = document.querySelectorAll(".btn__operator");
const openParenthesisButton = document.getElementById("open-parenthesis");
const closeParenthesisButton = document.getElementById("close-parenthesis");
const posOrNegButton = document.getElementById("toggle-negative");
const percentageButton = document.getElementById("percentage-button");
const piButton = document.getElementById("pi-button");
const squareButton = document.getElementById("square-button");
const cubeButton = document.getElementById("cube-button");
const customExponentButton = document.getElementById("custom-exponent-button");
const eulerButton = document.getElementById("euler-button");
const factorialButton = document.getElementById("factorial-button");
const inverseFractionButton = document.getElementById(
  "inverse-fraction-button"
);
const eulerRaisedButton = document.getElementById("euler-raised-button");
const trigButtons = document.querySelectorAll(".btn__trig");
const displayNum = document.getElementById("display-text");

//////// Event Listeners ////////

////// Click Event Listeners //////

// Number Buttons //

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    myCalculator.handleNums(e.target.innerText);
    myCalculator.buttonAnimation(e.target);
  });
});

posOrNegButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.makePosOrNeg, e.target);
});

// Operator Buttons //

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    myCalculator.handleOperators(e.target.innerText);
    myCalculator.buttonAnimation(e.target);
  });
});

clearButton.addEventListener("click", () => {
  myCalculator.clear();
});

// Non-Number/Non-Operator Buttons //

openParenthesisButton.addEventListener("click", (e) => {
  if (myCalculator.handleOpenParenthesis()) {
    myCalculator.buttonAnimation(e.target);
  }
});

closeParenthesisButton.addEventListener("click", (e) => {
  if (myCalculator.handleCloseParenthesis()) {
    myCalculator.buttonAnimation(e.target);
  }
});

percentageButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handlePercentage, e.target);
});

piButton.addEventListener("click", (e) => {
  myCalculator.handlePi();
  myCalculator.buttonAnimation(e.target);
});

eulerButton.addEventListener("click", (e) => {
  myCalculator.handleEuler();
  myCalculator.buttonAnimation(e.target);
});

eulerRaisedButton.addEventListener("click", (e) => {
  if (myCalculator.base) {
    return;
  }
  myCalculator.handleRaiseEuler();
  myCalculator.buttonAnimation(e.target);
});

squareButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handleSquared, e.target);
});

cubeButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handleCubed, e.target);
});

factorialButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handleFactorial, e.target);
});

inverseFractionButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(
    myCalculator.handleInverseFraction,
    e.target
  );
});

customExponentButton.addEventListener("click", (e) => {
  if (myCalculator.base) {
    return;
  }
  if (myCalculator.isValidNumString(myCalculator.currentNumString)) {
    myCalculator.setBase();
    myCalculator.buttonAnimation(e.target);
  }
});

trigButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    myCalculator.determineTrigFunction(e.target);
    myCalculator.buttonAnimation(e.target);
  });
});

////// Keyup Event Listeners //////

document.addEventListener("keyup", (e) => {
  if (NUMS.includes(e.key)) {
    myCalculator.handleNums(e.key);
    myCalculator.buttonAnimation(document.getElementById(`num_${e.key}`));
  }
});

document.addEventListener("keyup", (e) => {
  if (OPERATORS.includes(e.key)) {
    myCalculator.handleOperators(e.key);
    if (MULTIPLIERS.includes(e.key)) {
      myCalculator.buttonAnimation(document.getElementById("multiply"));
    } else if (DIVISION.includes(e.key)) {
      myCalculator.buttonAnimation(document.getElementById("divide"));
    } else if (ADDITION.includes(e.key)) {
      myCalculator.buttonAnimation(document.getElementById("add"));
    } else if (SUBTRACTION.includes(e.key)) {
      myCalculator.buttonAnimation(document.getElementById("subtract"));
    } else if (EQUALS_OPERATORS.includes(e.key)) {
      myCalculator.buttonAnimation(document.getElementById("equals"));
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "(") {
    if (myCalculator.handleOpenParenthesis()) {
      myCalculator.buttonAnimation(openParenthesisButton);
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === ")") {
    if (myCalculator.handleCloseParenthesis()) {
      myCalculator.buttonAnimation(closeParenthesisButton);
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Backspace") {
    myCalculator.clear();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    myCalculator.allClear();
  }
});

// document.addEventListener("keyup", (e) => {
//   if (e.key === "_") {
//     if (makePosOrNeg()) {
//       buttonAnimation(document.getElementById("toggle-negative"));
//     }
//   }
// });
