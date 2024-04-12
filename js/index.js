// console.log(
//   "0.1 + 0.2 = using math.chain from mathjs: ",
//   math.chain(0.1).add(0.2).toString()
// );
// console.log("0.1 + 0.2 = using built in JS math operator ", 0.1 + 0.2);
// console.log("mathjs library: ", math);
// console.log("built in Math library: ", Math);

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

//////// DOM Elements ////////

const calculatorShell = document.getElementById("calculator-shell");
const expandableKeypadShell = document.getElementById(
  "expandable-keypad-shell"
);
const expandKeypadButton = document.getElementById("expand-keypad");
const clearButtons = document.querySelectorAll(".btn__clear");
const numberButtons = document.querySelectorAll(".btn__num");
const operatorButtons = document.querySelectorAll(".btn__operator");
const openParenthesisButtons = document.querySelectorAll(".open-parenthesis");
const closeParenthesisButtons = document.querySelectorAll(".close-parenthesis");
const posOrNegButtons = document.querySelectorAll(".toggle-negative");
const percentageButtons = document.querySelectorAll(".percentage-button");
const piButtons = document.querySelectorAll(".pi");
const squareButtons = document.querySelectorAll(".square");
const cubeButtons = document.querySelectorAll(".cube");
const customExponentButtons = document.querySelectorAll(".custom-exponent");
const eulerButtons = document.querySelectorAll(".euler");
const factorialButtons = document.querySelectorAll(".factorial");
const inverseFractionButtons = document.querySelectorAll(".btn__inverse");
const eulerRaisedButtons = document.querySelectorAll(".e-raised");
const trigButtons = document.querySelectorAll(".btn__trig");
const displayNum = document.getElementById("display-text");

//////// Global Variables ////////

const equationStack = ["+0"];
const operatorsBeforeParentheses = [];
let currentNumString = "";
let base = "";
let trig = "";
let equationStringHasReduced = false;
let overwriteCurrentNumString = false;

////// Click Event Listeners //////

// Number Buttons //

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleNums(e.target.innerText);
    buttonAnimation(e.target);
  });
});

posOrNegButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    updateNumStringInPlace(makePosOrNeg, e.target);
  });
});

// Operator Buttons //

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleOperators(e.target.innerText);
    buttonAnimation(e.target);
  });
});

// Non-Number/Non-Operator Buttons //

openParenthesisButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (handleOpenParenthesis()) {
      buttonAnimation(e.target);
    }
  });
});

closeParenthesisButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (handleCloseParenthesis()) {
      buttonAnimation(e.target);
    }
  });
});

clearButtons.forEach((button) => {
  button.addEventListener("click", () => {
    clear();
  });
});

percentageButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    updateNumStringInPlace(handlePercentage, e.target);
  });
});

piButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handlePi();
    buttonAnimation(e.target);
  });
});

eulerButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleEuler();
    buttonAnimation(e.target);
  });
});

eulerRaisedButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (base) {
      return;
    }
    handleRaiseEuler();
    buttonAnimation(e.target);
  });
});

squareButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    updateNumStringInPlace(handleSquared, e.target);
  });
});

cubeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    updateNumStringInPlace(handleCubed, e.target);
  });
});

factorialButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    updateNumStringInPlace(handleFactorial, e.target);
  });
});

inverseFractionButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    updateNumStringInPlace(handleInverseFraction, e.target);
  });
});

customExponentButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (base) {
      return;
    }
    if (isValidNumString(currentNumString)) {
      setBase();
      buttonAnimation(e.target);
    }
  });
});

trigButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    determineTrigFunction(e.target);
    buttonAnimation(e.target);
  });
});

// Expandable Keypad Console

expandKeypadButton.addEventListener("click", expandKeypadShell);

////// Keyup Event Listeners //////

document.addEventListener("keyup", (e) => {
  if (NUMS.includes(e.key)) {
    handleNums(e.key);
    buttonAnimation(document.getElementById(`num_${e.key}`));
  }
});

document.addEventListener("keyup", (e) => {
  if (OPERATORS.includes(e.key)) {
    handleOperators(e.key);
    if (MULTIPLIERS.includes(e.key)) {
      buttonAnimation(document.getElementById("multiply"));
    } else if (DIVISION.includes(e.key)) {
      buttonAnimation(document.getElementById("divide"));
    } else if (ADDITION.includes(e.key)) {
      buttonAnimation(document.getElementById("add"));
    } else if (SUBTRACTION.includes(e.key)) {
      buttonAnimation(document.getElementById("subtract"));
    } else if (EQUALS_OPERATORS.includes(e.key)) {
      buttonAnimation(document.getElementById("equals"));
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "(") {
    if (handleOpenParenthesis()) {
      buttonAnimation(document.getElementById("open-parenthesis"));
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === ")") {
    if (handleCloseParenthesis()) {
      buttonAnimation(document.getElementById("close-parenthesis"));
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Backspace") {
    clear();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    allClear();
  }
});

// document.addEventListener("keyup", (e) => {
//   if (e.key === "_") {
//     if (makePosOrNeg()) {
//       buttonAnimation(document.getElementById("toggle-negative"));
//     }
//   }
// });

////// Functions //////

////// Call Back Functions //////

////// Call Back Functions for Expanding and Collapsing Keypad Shell //////

function expandKeypadShell(event) {
  calculatorShell.classList.add("straight-bottom-left-border");
  expandableKeypadShell.classList.add("expanded-shell");
  setTimeout(() => {
    expandableKeypadShell.classList.add("higher-stacking-index");
  }, "500");
  event.target.addEventListener("click", collapseKeypadShell);
  event.target.removeEventListener("click", expandKeypadShell);
}

function collapseKeypadShell(event) {
  expandableKeypadShell.classList.remove("higher-stacking-index");
  setTimeout(() => {
    expandableKeypadShell.classList.remove("expanded-shell");
    calculatorShell.classList.remove("straight-bottom-left-border");
  }, "250");
  event.target.addEventListener("click", expandKeypadShell);
  event.target.removeEventListener("click", collapseKeypadShell);
}

////// Call Back Functions for Numbers and Operators //////

function handleNums(givenNum) {
  switchToClear(); // switch the clear button back to clear from A/C in the event that was pushed
  if (overwriteCurrentNumString) {
    currentNumString = giveDefaultOperator(currentNumString);
    currentNumString = currentNumString[0];
    overwriteCurrentNumString = false;
  }
  currentNumString = giveDefaultOperator(currentNumString);
  currentNumString = concatOrReplace(currentNumString, givenNum);
  updateDisplay(currentNumString);
}

function concatOrReplace(numString, newNum) {
  if (numString.includes(".") && newNum === ".") {
    return numString;
  }
  if (
    (numString.length === 2 && numString[1] === "0" && newNum === ".") ||
    (numString.length === 1 && newNum === ".")
  ) {
    numString = `${numString[0]}0.`;
  } else if (numString.length === 2 && numString[1] === "0") {
    // keep the operator in tact but disallow leading 0's i.e. +000005 could never happen; would just be +5
    numString = `${numString[0]}${newNum}`;
  } else {
    numString += newNum;
  }
  return numString;
}

function handleOperators(givenOperator) {
  if ((base || trig) && !isValidNumString(currentNumString)) {
    return;
  }
  if (base) {
    solveCustomExponents(base, currentNumString);
  }
  if (trig) {
    handleTrig();
  }
  if (overwriteCurrentNumString) {
    overwriteCurrentNumString = false;
  }
  const equationString = grabLastStringInStack(equationStack); // last string in the stack
  const nextOperator = givenOperator;
  if (EQUALS_OPERATORS.includes(nextOperator)) {
    handleEquals();
    return;
  }
  if (isValidNumString(currentNumString)) {
    currentNumString = giveDefaultOperator(currentNumString);
    currentNumString =
      currentNumString[0] + Number(currentNumString.slice(1)).toString(); // removes any unnecessary trailing 0's after a decimal point i.e. 12.00400 becomes 12.004
    const currentOperator = currentNumString[0];
    reduceEquationString(
      equationString,
      currentOperator,
      currentNumString,
      nextOperator
    );
  } else {
    blinkDisplay(grabLastNum(grabLastStringInStack(equationStack)).slice(1));
  }

  currentNumString = nextOperator;
}

/// Call Back Functions for non number/operator characters //////

function handlePercentage(num) {
  const percentAsDecimal = math.chain(num).divide(100);
  return percentAsDecimal;
}

function handlePi() {
  const operator = giveDefaultOperator(currentNumString)[0];
  const pi = math.pi.toString();
  currentNumString = operator + pi;
  updateDisplay(currentNumString);
  overwriteCurrentNumString = true;
}

function handleEuler() {
  const operator = giveDefaultOperator(currentNumString)[0];
  const euler = math.e.toString();
  currentNumString = operator + euler;
  updateDisplay(currentNumString);
  overwriteCurrentNumString = true;
}

function handleRaiseEuler() {
  handleEuler();
  base = currentNumString;
}

function handleSquared(num) {
  const squaredNumString = math.pow(num, 2);
  return squaredNumString;
}

function handleCubed(num) {
  const cubedNumString = math.pow(num, 3);
  return cubedNumString;
}

function handleFactorial(num) {
  const factorialString = math.factorial(num);
  return factorialString;
}

function handleInverseFraction(num) {
  const inverseFractionAsDecimal = math.chain(100).divide(num).divide(100);
  return inverseFractionAsDecimal;
}

function setBase() {
  base = currentNumString;
  currentNumString = "";
}

function solveCustomExponents() {
  const operator = base[0];
  const solution = math
    .pow(Number(base.slice(1)), Number(currentNumString))
    .toString();
  currentNumString = operator + solution;
  base = "";
}

////// Trig Functions /////////

function determineTrigFunction(button) {
  if (button.classList.contains("sin")) {
    trig = "sin";
  } else if (button.classList.contains("cos")) {
    trig = "cos";
  } else {
    trig = "tan";
  }
}

function handleTrig() {
  let trigSolution;
  const operator = currentNumString[0];
  if (trig === "sin") {
    trigSolution = math.sin(currentNumString.slice(1));
  } else if (trig === "cos") {
    trigSolution = math.cos(currentNumString.slice(1));
  } else {
    trigSolution = math.tan(currentNumString.slice(1));
  }
  trigSolution = operator + trigSolution.toString();
  trig = "";
  currentNumString = trigSolution;
}

////

//////  Call Back Functions for Parentheses  //////

function handleOpenParenthesis() {
  if (base) {
    return false; // prohibit button from animating
  }
  const operatorToStore = determineStoredOperator(currentNumString);
  operatorsBeforeParentheses.push(operatorToStore);
  if (isValidNumString(currentNumString)) {
    currentNumString = giveDefaultOperator(currentNumString);
    equationStack[equationStack.length - 1] += currentNumString; // store the last num outside the parenthesis in equationStack so we can deal with the parenthesis first
  }
  equationStack.push("+0");
  currentNumString = "";
  equationStringHasReduced = false;
  return true;
}

function handleCloseParenthesis() {
  if (operatorsBeforeParentheses.length === 0) {
    // if there are no open parenthesis, we can't close one
    return false;
  }
  if (!isValidNumString(currentNumString)) {
    currentNumString = fixInvalidNumString(currentNumString);
    currentOperator = currentNumString[0];
  } else {
    currentNumString = giveDefaultOperator(currentNumString);
    currentOperator = currentNumString[0];
  }

  // now solve what's in the parenthesis that we JUST closed
  // to do that, reduceEquationString with what we have for currentNumString, currentOperator, equationStack[lastIndex], and use '=' as nextOperator.
  const lastEquationString = grabLastStringInStack(equationStack); // this is what is inside the parenthesis we are closing.
  reduceEquationString(
    lastEquationString,
    currentOperator,
    currentNumString,
    "="
  ); // this will update the display to whatever the solution of the parenthesis math was
  const newParenthesisSolution = equationStack.pop(); // We're now storing whatever equation string was just reduced so we don't want it in equationStack anymore
  const operatorBeforeParenthesis = operatorsBeforeParentheses.pop(); // make sure we put the operator that was outside the opened parenthesis in front.  This will also make sure handleEquals() doesn't run infinitely since we are calling handleCloseParenthesis() on a loop that is based on the length of operatorsBeforeParentheses inside handleEquals()
  currentNumString = replaceOperator(
    newParenthesisSolution,
    operatorBeforeParenthesis
  );
  overwriteCurrentNumString = true;
  // currentOperator = "";
  return true;
}

//////  Call Back Function to handle Positive/Negative Numbers  //////

function makePosOrNeg(num) {
  if (num === 0) {
    return num;
  }
  if (num < 0) {
    return math.abs(num);
  } else {
    return 0 - num;
  }
}

//////  Call Back Function for Equals Sign  //////

function handleEquals() {
  if (equationStack.length > 1) {
    while (operatorsBeforeParentheses.length > 0) {
      handleCloseParenthesis();
    }
  }
  if (!isValidNumString(giveDefaultOperator(currentNumString))) {
    currentNumString = fixInvalidNumString(currentNumString);
  }
  reduceEquationString(
    grabLastStringInStack(equationStack),
    currentNumString[0],
    currentNumString,
    "="
  );
  currentNumString = equationStack[0];
  equationStack[0] = "+0";
  switchToClear(); // in case clear button says A/C because there's now nothing to clear
  equationStringHasReduced = false;
  overwriteCurrentNumString = true;
}

//////  Calculator Functionality //////

function reduceEquationString(
  equationString,
  currentOperator,
  currentNumString,
  nextOperator
) {
  if (!equationStringHasReduced) {
    equationStringHasReduced = true;
  }
  while (
    equationString.length !== 0 &&
    !isHigherOrder(currentOperator, nextOperator)
  ) {
    const lastNumString = grabLastNum(equationString); // this will be an operator and number, i.e. '+0'
    const lastOperator = lastNumString[0];
    const lastNum = lastNumString.slice(1); // get rid of the operator ...
    currentNumString = currentNumString.slice(1); // get rid of the operator in front of currentNumString to avoid this double negative problem: say for instance, currentNumString = '-5' and currentOperator is currentNumString[0], and then lastNumString = '+0' so solve() would get (0, '-', -5) passed into it which equates to (0 + 5) which is not what we want.  In this example, the - in front of 5 is the same character being set to currentOperator.  It is not actually minus -5, it should be minus +5 but it's being misinterpreted as minus -5.  Get rid of the operator completely and just look at what number currentNumString is supposed to be.
    equationString = cutFromNumString(equationString, lastNumString.length);
    equationStack[equationStack.length - 1] = equationString;
    const num1 = Number(lastNum);
    const num2 = Number(currentNumString);
    const solution = calculate(num1, num2, currentOperator);
    currentNumString = `${lastOperator}${solution.toString()}`;
    currentOperator = lastOperator;
  } // if we can't solve it yet, or if the last string in the stack is empty, concatenate currentNumString to the end of the last string in equationStack
  currentNumString = giveDefaultOperator(currentNumString);
  equationStack[equationStack.length - 1] += currentNumString;
  updateDisplay(currentNumString);
  blinkDisplay(currentNumString.slice(1));
}

function calculate(num1, num2, currentOperator) {
  let answer;
  if (currentOperator === "+") {
    answer = math.chain(num1).add(num2).done();
  } else if (currentOperator === "-") {
    answer = math.chain(num1).subtract(num2).done();
  } else if (
    currentOperator === "*" ||
    currentOperator === "x" ||
    currentOperator === "X"
  ) {
    answer = math.chain(num1).multiply(num2).done();
  } else {
    answer = math.chain(num1).divide(num2).done();
  }
  return answer;
}

function clear() {
  if (
    !isValidNumString(currentNumString) &&
    equationStack[0] === "+0" &&
    equationStack.length === 1 &&
    !trig &&
    !base
  ) {
    blinkDisplay("0"); // there's nothing to clear
    return;
  }
  if (isValidNumString(currentNumString)) {
    if (equationStack[0] !== "+0" || equationStack.length > 1) {
      currentNumString = giveDefaultOperator(currentNumString)[0]; // we're just clearing the current number, but keeping its operator, and switching this button's functionality to allClear() in case it's clicked a second time
      switchToAllClear();
    } else {
      currentNumString = "";
    }
  } else {
    currentNumString = ""; // then there's more stuff to clear in the stack, but this currentNumString isn't valid anyway, so just set it to an empty string and switch the button's functionality to allClear() in case it's clicked a second time
    switchToAllClear();
  }
  updateDisplay("0");
  clearButtons.forEach((button) => {
    buttonAnimation(button);
  });
}

function switchToAllClear() {
  clearButtons.forEach((button) => {
    button.innerText = "A/C";
    button.removeEventListener("click", clear);
    button.addEventListener("click", allClear);
  });
}

function switchToClear() {
  clearButtons.forEach((button) => {
    button.innerText = "C";
    button.removeEventListener("click", allClear);
    button.addEventListener("click", clear);
  });
}

function allClear() {
  currentNumString = "";
  equationStack.length = 0;
  equationStack.push("+0");
  base = "";
  trig = "";
  updateDisplay(currentNumString);
  switchToClear();
  equationStringHasReduced = false; // so if new parenthesis are opened immediately after this button is pressed, their value is added to zero not multiplied by it. i.e. (3 + 4) (5 - 2) === +0+7 *3 not +0*7 *3
  clearButtons.forEach((button) => {
    buttonAnimation(button);
  });
}

function updateNumStringInPlace(functionToUpdateNumString, eventTarget) {
  if (!isValidNumString(currentNumString)) {
    const lastNumStringFromStack = grabLastNum(
      grabLastStringInStack(equationStack)
    );
    equationStack[equationStack.length - 1] = cutFromNumString(
      grabLastStringInStack(equationStack),
      lastNumStringFromStack.length
    );
    currentNumString = lastNumStringFromStack;
  }
  const operator = currentNumString[0];
  const num = Number(removeOperator(currentNumString));
  const newNumString = functionToUpdateNumString(num).toString();
  currentNumString = operator + newNumString;
  buttonAnimation(eventTarget);
  updateDisplay(currentNumString);
  overwriteCurrentNumString = true;
}

function updateDisplay(numString) {
  if (numString.length === 0) {
    numString = grabLastNum(grabLastStringInStack(equationStack));
  }
  const firstChar = numString[0];
  if (isOperator(firstChar)) {
    numString = numString.slice(1);
  }
  displayNum.value = numString;
  blinkDisplay(numString);
}

// helper functions

function isValidNumString(localNumString) {
  if (
    !(
      localNumString.length === 0 ||
      (localNumString.length === 1 && isOperator(localNumString))
    )
  ) {
    return true;
  }
  return false;
}

function grabLastStringInStack(givenEquationStack) {
  return givenEquationStack[givenEquationStack.length - 1];
}

function fixInvalidNumString(invalidNumString) {
  const operator = giveDefaultOperator(invalidNumString)[0];
  if (HIGHER_ORDER_OPERATIONS.includes(operator)) {
    return `${operator}1`;
  } else {
    return `${operator}0`;
  }
}

function grabLastNum(equationString) {
  let index = equationString.length - 1;
  let lastNum;
  while (index >= 0) {
    if (isOperator(equationString[index])) {
      if (isOperator(equationString[index - 1])) {
        lastNum = equationString.slice(index - 1);
      } else {
        lastNum = equationString.slice(index);
      }
      return lastNum;
    }
    index -= 1;
  }
  return lastNum;
}

function cutFromNumString(numString, lengthToCut) {
  index = numString.length - lengthToCut;
  newString = numString.slice(0, index);
  return newString;
}

function isDigit(char) {
  return NUMS.includes(char);
}

function isHigherOrder(currentOperator, nextOperator) {
  return (
    LOWER_ORDER_OPERATIONS.includes(currentOperator) &&
    HIGHER_ORDER_OPERATIONS.includes(nextOperator)
  );
}

function isOperator(char) {
  return OPERATORS.includes(char);
}

function giveDefaultOperator(numString) {
  if (numString === "" || !isOperator(numString[0])) {
    numString = `+${numString}`;
  }
  return numString;
}

function determineStoredOperator(numString) {
  let storedOperator;
  if (numString.length === 0 && !equationStringHasReduced) {
    storedOperator = "+";
  } else if (numString.length === 1 && !isValidNumString(numString)) {
    storedOperator = numString;
  } else {
    storedOperator = "*";
  }
  return storedOperator;
}

function replaceOperator(numString, newOperator) {
  numString = `${newOperator}${numString.slice(1)}`;
  return numString;
}

function removeOperator(numString) {
  return numString.slice(1);
}

function buttonAnimation(button) {
  button.classList.add("key-pressed");
  setTimeout(() => {
    button.classList.remove("key-pressed");
  }, 150);
}

function blinkDisplay(numString) {
  displayNum.value = " ";
  setTimeout(() => {
    displayNum.value = numString;
  }, 30);
}
