import Calculator from "./calculator.js";
import addCommasToNumString from "./addCommasToNumString.js";
import ColorScheme from "./colorScheme.js";
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
const mainBackground = document.getElementById("main-background");
const calculatorShell = document.getElementById("calculator-shell");
const displayWindow = document.getElementById("display-window");
const displayNum = document.getElementById("display-text");
const allButtons = Array.from(document.querySelectorAll(".btn"));
const darkModeElements = [
  mainBackground,
  calculatorShell,
  displayWindow,
  allButtons,
];
const toggleDarkModeButton = document.getElementById("toggle-dark-mode");
const generateColorSchemeButton = document.getElementById(
  "generate-color-scheme"
);
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
const tanButton = document.getElementById("tan");
const sinButton = document.getElementById("sin");
const cosButton = document.getElementById("cos");
const headTag = Array.from(document.getElementsByTagName("head"))[0];
const styleTag = document.createElement("style");
headTag.appendChild(styleTag);

function reduceTextSize(numString) {
  if (numString.length > 17) {
    displayNum.classList.add("smaller-text");
    displayNum.classList.remove("small-text");
  } else if (numString.length > 11) {
    displayNum.classList.add("small-text");
    displayNum.classList.remove("smaller-text");
  } else {
    displayNum.classList.remove("small-text");
    displayNum.classList.remove("smaller-text");
  }
}

function removeCommasFromNumString(numString) {
  let commalessNumString = "";
  for (let i = 0; i < numString.length; i++) {
    if (numString[i] === ",") {
      continue;
    }
    commalessNumString += numString[i];
  }
  return commalessNumString;
}

function fixDecimals(numString) {
  if (numString.includes(",")) {
    numString = removeCommasFromNumString(numString);
  }
  const num = Number(numString);
  const newNumString = Number(num.toFixed(11)).toString();
  return newNumString;
}

function blinkDisplay(numString, decimalsShouldBeFixed = true) {
  if (decimalsShouldBeFixed && numString.includes(".")) {
    numString = fixDecimals(numString);
  }
  if (
    numString !== "Error" &&
    numString !== "Infinity" &&
    numString !== "-Infinity"
  ) {
    numString = addCommasToNumString(numString);
  }

  reduceTextSize(numString);
  displayNum.innerText = " ";
  setTimeout(() => {
    displayNum.innerText = numString;
  }, 30);
}

function buttonAnimation(button) {
  button.classList.add("key-pressed");
  setTimeout(() => {
    button.classList.remove("key-pressed");
  }, 150);
}

function animateButtonAndBlinkDisplay(buttonToAnimate, decimalsShouldBeFixed) {
  buttonAnimation(buttonToAnimate);
  blinkDisplay(myCalculator.numToDisplay, decimalsShouldBeFixed);
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

function setColors(customColors) {
  styleTag.innerText = `:root  {
  --backdrop-lightest: hsl(${customColors.backdropLightest[0]}, ${customColors.backdropLightest[1]}%, ${customColors.backdropLightest[2]}%);
  --backdrop-lighter: hsl(${customColors.backdropLighter[0]}, ${customColors.backdropLighter[1]}%, ${customColors.backdropLighter[2]}%);
  --backdrop: hsl(${customColors.backdrop[0]}, ${customColors.backdrop[1]}%, ${customColors.backdrop[2]}%);
  --darkmode-backdrop: hsl(${customColors.darkModeBackdrop[0]}, ${customColors.darkModeBackdrop[1]}%, ${customColors.darkModeBackdrop[2]}%);
  --darkmode-backdrop-darker: hsl(${customColors.darkModeBackdropDarker[0]}, ${customColors.darkModeBackdropDarker[1]}%, ${customColors.darkModeBackdropDarker[2]}%);;
  --darkmode-backdrop-darkest: hsl(${customColors.darkModeBackdropDarkest[0]}, ${customColors.darkModeBackdropDarkest[1]}%, ${customColors.darkModeBackdropDarkest[2]}%);
  --operator-buttons: hsl(${customColors.operatorButtons[0]}, ${customColors.operatorButtons[1]}%, ${customColors.operatorButtons[2]}%);
  --darkmode-operator-buttons: hsl(${customColors.darkModeOperatorButtons[0]}, ${customColors.darkModeOperatorButtons[1]}%, ${customColors.darkModeOperatorButtons[2]}%);
  --calculator-shell-lightest: hsl(${customColors.calculatorShellLightest[0]}, ${customColors.calculatorShellLightest[1]}%, ${customColors.calculatorShellLightest[2]}%);
  --calculator-shell-lighter: hsl(${customColors.calculatorShellLighter[0]}, ${customColors.calculatorShellLighter[1]}%, ${customColors.calculatorShellLighter[2]}%);
  --calculator-shell: hsl(${customColors.calculatorShell[0]}, ${customColors.calculatorShell[1]}%, ${customColors.calculatorShell[2]}%);
  --calculator-shell-darker: hsl(${customColors.calculatorShellDarker[0]}, ${customColors.calculatorShellDarker[1]}%, ${customColors.calculatorShellDarker[2]}%); 
  --display-window: hsl(${customColors.displayWindow[0]}, ${customColors.displayWindow[1]}%, ${customColors.displayWindow[2]}%);
}`;
}

function rotateColorWheel() {
  generateColorSchemeButton.classList.add("spin-wheel");
  setTimeout(() => {
    generateColorSchemeButton.classList.remove("spin-wheel");
  }, 500);
}

////// Event Listeners ////////

//// Click Event Listeners //////

// Toggle Dark Mode and Generate Color Schemes //

toggleDarkModeButton.addEventListener("click", () => {
  toggleDarkMode(darkModeElements);
});

generateColorSchemeButton.addEventListener("click", () => {
  rotateColorWheel();
  myColorScheme.createCustomPalette();
  setColors(myColorScheme.colors);
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
    const decimalsShouldBeFixed = false;
    animateButtonAndBlinkDisplay(e.target, decimalsShouldBeFixed);
  });
});

posOrNegButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.makePosOrNeg);
  animateButtonAndBlinkDisplay(e.target);
});

// Operator Buttons //

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    myCalculator.handleOperators(e.target.innerText);
    animateButtonAndBlinkDisplay(e.target);
  });
});

clearButton.addEventListener("click", (e) => {
  if (
    myCalculator.currentNumString.length === 0 &&
    myCalculator.equationStack[0] === "+0" &&
    myCalculator.equationStack.length === 1
  ) {
    return;
  }
  if (myCalculator.clearAll) {
    myCalculator.allClear();
    e.target.innerText = "C";
  } else {
    myCalculator.clearCurrentNumString();
    if (myCalculator.clearAll) {
      e.target.innerText = "A/C";
    }
  }
  animateButtonAndBlinkDisplay(e.target);
});

// Non-Number/Non-Operator Buttons //

openParenthesisButton.addEventListener("click", (e) => {
  if (myCalculator.handleOpenParenthesis()) {
    animateButtonAndBlinkDisplay(e.target);
  }
});

closeParenthesisButton.addEventListener("click", (e) => {
  if (myCalculator.handleCloseParenthesis()) {
    animateButtonAndBlinkDisplay(e.target);
  }
});

percentageButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handlePercentage);
  animateButtonAndBlinkDisplay(e.target);
});

piButton.addEventListener("click", (e) => {
  myCalculator.handlePi();
  animateButtonAndBlinkDisplay(e.target);
});

eulerButton.addEventListener("click", (e) => {
  myCalculator.handleEuler();
  animateButtonAndBlinkDisplay(e.target);
});

eulerRaisedButton.addEventListener("click", (e) => {
  myCalculator.handleRaiseEuler();
  animateButtonAndBlinkDisplay(e.target);
});

squareButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handleSquared);
  animateButtonAndBlinkDisplay(e.target);
});

cubeButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handleCubed);
  animateButtonAndBlinkDisplay(e.target);
});

factorialButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handleFactorial);
  animateButtonAndBlinkDisplay(e.target);
});

inverseFractionButton.addEventListener("click", (e) => {
  myCalculator.updateNumStringInPlace(myCalculator.handleInverseFraction);
  animateButtonAndBlinkDisplay(e.target);
});

customExponentButton.addEventListener("click", (e) => {
  myCalculator.handleOperators("^");
  animateButtonAndBlinkDisplay(e.target);
});

tanButton.addEventListener("click", (e) => {
  myCalculator.handleOperators("t");
  animateButtonAndBlinkDisplay(e.target);
});

sinButton.addEventListener("click", (e) => {
  myCalculator.handleOperators("s");
  animateButtonAndBlinkDisplay(e.target);
});

cosButton.addEventListener("click", (e) => {
  myCalculator.handleOperators("c");
  animateButtonAndBlinkDisplay(e.target);
});

const myCalculator = new Calculator();
myCalculator.updateNumToDisplay();
blinkDisplay(myCalculator.numToDisplay);
const myColorScheme = new ColorScheme();
setColors(myColorScheme.colors);

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
