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
const displayNum = document.getElementById("display-text");
const headTag = Array.from(document.getElementsByTagName("head"))[0];
const styleTag = document.createElement("style");
headTag.appendChild(styleTag);

let myColorScheme = {
  // hardcoded to start but this will come from localStorage

  // primary scheme
  primaryLightest: [185, 40, 71],
  primaryLighter: [195, 43, 62],
  primary: [200, 33, 50],
  primaryDarker: [205, 23, 36],
  primaryDarkest: [215, 26, 27],
  secondary: [100, 30, 66],
  accent: [20, 100, 50],
  displayWindow: [185, 100, 87],
};

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

function setColors(customColors) {
  styleTag.innerText = `:root  {
  --primary-lightest: hsl(${customColors.primaryLightest[0]}, ${customColors.primaryLightest[1]}%, ${customColors.primaryLightest[2]}%);
  --primary-lighter: hsl(${customColors.primaryLighter[0]}, ${customColors.primaryLighter[1]}%, ${customColors.primaryLighter[2]}%);
  --primary: hsl(${customColors.primary[0]}, ${customColors.primary[1]}%, ${customColors.primary[2]}%);
  --primary-darker: hsl(${customColors.primaryDarker[0]}, ${customColors.primaryDarker[1]}%, ${customColors.primaryDarker[2]}%);
  --primary-darkest: hsl(${customColors.primaryDarkest[0]}, ${customColors.primaryDarkest[1]}%, ${customColors.primaryDarkest[2]}%);
  --secondary: hsl(${customColors.secondary[0]}, ${customColors.secondary[1]}%, ${customColors.secondary[2]}%);
  --accent: hsl(${customColors.accent[0]}, ${customColors.accent[1]}%, ${customColors.accent[2]}%);
  --display-window: hsl(${customColors.displayWindow[0]}, ${customColors.displayWindow[1]}%, ${customColors.displayWindow[2]}%);
}`;
}

function createCustomPalette() {
  // return a new colors object to be passed into setColors()
  const customColorScheme = {};
  const newPrimaryColor = [
    Math.floor(Math.random() * 360), // hue between 0 and 360deg, saturation between 60% and 80%, light between 40% and 60%
    Math.floor(Math.random() * 20) + 60,
    Math.floor(Math.random() * 20) + 40,
  ];
  customColorScheme.primary = newPrimaryColor;

  // now, set other colors based on these new primary color values

  const newPrimaryDarker = [
    newPrimaryColor[0] + 5,
    newPrimaryColor[1] - 10,
    newPrimaryColor[2] - 16,
  ];
  customColorScheme.primaryDarker = newPrimaryDarker;

  const newPrimaryDarkest = [
    newPrimaryColor[0] + 15,
    newPrimaryColor[1] - 7,
    newPrimaryColor[2] - 23,
  ];
  customColorScheme.primaryDarkest = newPrimaryDarkest;

  const newPrimaryLighter = [
    newPrimaryColor[0] - 5,
    newPrimaryColor[1] + 10,
    newPrimaryColor[2] + 12,
  ];
  customColorScheme.primaryLighter = newPrimaryLighter;

  const newPrimaryLightest = [
    newPrimaryColor[0] - 15,
    newPrimaryColor[1] + 7,
    newPrimaryColor[2] + 21,
  ];
  customColorScheme.primaryLightest = newPrimaryLightest;

  const newSecondary = [
    newPrimaryColor[0] - 20,
    newPrimaryColor[1] - 3,
    newPrimaryColor[2] + 16,
  ];
  customColorScheme.secondary = newSecondary;

  const newAccent = [
    newPrimaryColor[0] - 180,
    Math.floor(Math.random() * 10) + 60, // saturation between 60% and 70%
    Math.floor(Math.random() * 20) + 40, // light between 40% and 60%
  ];
  customColorScheme.accent = newAccent;

  const newDisplayWindow = [newPrimaryColor[0] - 15, 100, 87];
  customColorScheme.displayWindow = newDisplayWindow;
  return customColorScheme;
}

function rotateColorWheel() {
  generateColorSchemeButton.classList.add("spin-wheel");
  setTimeout(() => {
    generateColorSchemeButton.classList.remove("spin-wheel");
  }, 500);
}

function animateButtonAndBlinkDisplay(buttonToAnimate) {
  buttonAnimation(buttonToAnimate);
  blinkDisplay(myCalculator.numToDisplay);
}

////// Event Listeners ////////

//// Click Event Listeners //////

// Toggle Dark Mode and Generate Color Schemes //

toggleDarkModeButton.addEventListener("click", () => {
  toggleDarkMode(darkModeElements);
});

generateColorSchemeButton.addEventListener("click", () => {
  rotateColorWheel();
  setColors(createCustomPalette());
});

// setColors(createCustomPalette());

// Number Buttons //

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    myCalculator.handleNums(e.target.innerText);
    if (myCalculator.clearAll) {
      clearButton.innerText = "A/C";
    } else {
      clearButton.innerText = "C";
    }
    animateButtonAndBlinkDisplay(e.target);
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
setColors(myColorScheme);

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
