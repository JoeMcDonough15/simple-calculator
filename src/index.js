import Calculator from "./calculator.js";
import "./css/styles.css";

// //////// Constants ////////

const NUMS = "0123456789.";
const OPERATORS = "+÷-xX/*=Enter";
const MULTIPLIERS = "Xx*";
const DIVISION = "/÷";
const ADDITION = "+";
const SUBTRACTION = "-";
const EQUALS_OPERATORS = "=Enter";

// //////// DOM Elements ////////
const mainContainer = document.getElementById("main-container");
const calculatorShell = document.getElementById("calculator-shell");
const displayWindow = document.getElementById("display-window");
const allButtons = Array.from(document.querySelectorAll(".btn"));
const darkModeElements = [
  mainContainer,
  calculatorShell,
  displayWindow,
  allButtons,
];
const toggleDarkModeButton = document.getElementById("toggle-dark-mode");
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

const myCalculator = new Calculator();

function blinkDisplay(numString) {
  displayNum.value = " ";
  setTimeout(() => {
    displayNum.value = numString;
  }, 30);
}

function buttonAnimation(button) {
  button.classList.add("key-pressed");
  setTimeout(() => {
    button.classList.remove("key-pressed");
  }, 150);
}

function toggleDarkMode(elementsArray) {
  elementsArray.forEach((element) => {
    if (element.constructor === Array) {
      toggleDarkMode(element);
    } else {
      element.classList.toggle("dark");
    }
  });
}

////// Event Listeners ////////

//// Click Event Listeners //////

// Toggle Dark Mode //

toggleDarkModeButton.addEventListener("click", () => {
  toggleDarkMode(darkModeElements);
});

// Number Buttons //

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    myCalculator.handleNums(e.target.innerText);
    if (myCalculator.clearAll) {
      clearButton.innerText = "A/C";
    } else {
      clearButton.innerText = "C";
    }
    buttonAnimation(e.target);
    blinkDisplay(myCalculator.numToDisplay);
  });
});

posOrNegButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.makePosOrNeg);
  buttonAnimation(e.target);
  blinkDisplay(myCalculator.numToDisplay);
});

// Operator Buttons //

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    myCalculator.handleOperators(e.target.innerText);
    buttonAnimation(e.target);
    blinkDisplay(myCalculator.numToDisplay);
  });
});

clearButton.addEventListener("click", (event) => {
  if (myCalculator.clearAll) {
    myCalculator.allClear();
    event.target.innerText = "C";
  } else {
    myCalculator.clear();
    if (myCalculator.clearAll) {
      event.target.innerText = "A/C";
    }
  }
  buttonAnimation(event.target);
  blinkDisplay(myCalculator.numToDisplay);
});

// Non-Number/Non-Operator Buttons //

openParenthesisButton.addEventListener("click", (e) => {
  if (myCalculator.handleOpenParenthesis()) {
    buttonAnimation(e.target);
  }
});

closeParenthesisButton.addEventListener("click", (e) => {
  if (myCalculator.handleCloseParenthesis()) {
    buttonAnimation(e.target);
    blinkDisplay(myCalculator.numToDisplay);
  }
});

percentageButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handlePercentage);
  buttonAnimation(e.target);
  blinkDisplay(myCalculator.numToDisplay);
});

piButton.addEventListener("click", (e) => {
  myCalculator.handlePi();
  buttonAnimation(e.target);
  blinkDisplay(myCalculator.numToDisplay);
});

eulerButton.addEventListener("click", (e) => {
  myCalculator.handleEuler();
  buttonAnimation(e.target);
  blinkDisplay(myCalculator.numToDisplay);
});

eulerRaisedButton.addEventListener("click", (e) => {
  if (myCalculator.base) {
    return;
  }
  myCalculator.handleRaiseEuler();
  buttonAnimation(e.target);
  blinkDisplay(myCalculator.numToDisplay);
});

squareButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handleSquared);
  buttonAnimation(e.target);
  blinkDisplay(myCalculator.numToDisplay);
});

cubeButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handleCubed);
  buttonAnimation(e.target);
  blinkDisplay(myCalculator.numToDisplay);
});

factorialButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handleFactorial);
  buttonAnimation(e.target);
  blinkDisplay(myCalculator.numToDisplay);
});

inverseFractionButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handleInverseFraction);
  buttonAnimation(e.target);
  blinkDisplay(myCalculator.numToDisplay);
});

customExponentButton.addEventListener("click", (e) => {
  if (myCalculator.base) {
    return;
  }
  if (myCalculator.isValidNumString(myCalculator.currentNumString)) {
    myCalculator.setBase();
    buttonAnimation(e.target);
    blinkDisplay(myCalculator.numToDisplay);
  }
});

trigButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    myCalculator.determineTrigFunction(e.target.getAttribute("id"));
    buttonAnimation(e.target);
  });
});

////// Keyup Event Listeners //////

// document.addEventListener("keyup", (e) => {
//   if (NUMS.includes(e.key)) {
//     myCalculator.handleNums(e.key);
//     myCalculator.buttonAnimation(document.getElementById(`num_${e.key}`));
//   }
// });

// document.addEventListener("keyup", (e) => {
//   if (OPERATORS.includes(e.key)) {
//     myCalculator.handleOperators(e.key);
//     if (MULTIPLIERS.includes(e.key)) {
//       myCalculator.buttonAnimation(document.getElementById("multiply"));
//     } else if (DIVISION.includes(e.key)) {
//       myCalculator.buttonAnimation(document.getElementById("divide"));
//     } else if (ADDITION.includes(e.key)) {
//       myCalculator.buttonAnimation(document.getElementById("add"));
//     } else if (SUBTRACTION.includes(e.key)) {
//       myCalculator.buttonAnimation(document.getElementById("subtract"));
//     } else if (EQUALS_OPERATORS.includes(e.key)) {
//       myCalculator.buttonAnimation(document.getElementById("equals"));
//     }
//   }
// });

// document.addEventListener("keyup", (e) => {
//   if (e.key === "(") {
//     if (myCalculator.handleOpenParenthesis()) {
//       myCalculator.buttonAnimation(openParenthesisButton);
//     }
//   }
// });

// document.addEventListener("keyup", (e) => {
//   if (e.key === ")") {
//     if (myCalculator.handleCloseParenthesis()) {
//       myCalculator.buttonAnimation(closeParenthesisButton);
//     }
//   }
// });

// document.addEventListener("keyup", (e) => {
//   if (e.key === "Backspace") {
//     myCalculator.clear();
//   }
// });

// document.addEventListener("keyup", (e) => {
//   if (e.key === "Escape") {
//     myCalculator.allClear();
//   }
// });

// // document.addEventListener("keyup", (e) => {
// //   if (e.key === "_") {
// //     if (makePosOrNeg()) {
// //       buttonAnimation(document.getElementById("toggle-negative"));
// //     }
// //   }
// // });
