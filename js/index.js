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
let lastParenthesisSolution = "";
let base = "";
let trig = "";
let theta = "";
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
    const numObject = determineCorrectNumString();
    if (numObject.stringValue) {
      makePosOrNeg(numObject);
      buttonAnimation(e.target);
    } else {
      blinkDisplay("0");
    }
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
    const numObject = determineCorrectNumString();
    if (numObject.stringValue) {
      handlePercentage(numObject);
      buttonAnimation(e.target);
    }
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
    const numObject = determineCorrectNumString();
    if (numObject.stringValue) {
      handleSquared(numObject);
      buttonAnimation(e.target);
    }
  });
});

cubeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const numObject = determineCorrectNumString();
    if (numObject.stringValue) {
      handleCubed(numObject);
      buttonAnimation(e.target);
    }
  });
});

factorialButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const numObject = determineCorrectNumString();
    if (numObject.stringValue) {
      handleFactorial(numObject);
      buttonAnimation(e.target);
    }
  });
});

inverseFractionButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const numObject = determineCorrectNumString();
    if (numObject.stringValue) {
      handleInverseFraction(numObject);
      buttonAnimation(e.target);
    }
  });
});

customExponentButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (base) {
      return;
    }
    const numObject = determineCorrectNumString();
    if (numObject.stringValue) {
      setBase(numObject);
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
  if (trig) {
    theta = concatOrReplace(theta, givenNum);
    updateDisplay(theta);
    return;
  }
  if (overwriteCurrentNumString) {
    currentNumString = "";
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
  if (
    (base && !isValidNumString(currentNumString)) ||
    (trig && !isValidNumString(theta))
  ) {
    return;
  }
  if (base) {
    solveCustomExponents(base, currentNumString);
  }
  if (trig) {
    currentNumString = handleTrig();
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
  if (lastParenthesisSolution) {
    reduceEquationString(
      equationString, // last string from the stack
      lastParenthesisSolution[0], // the operator that went in front of the parentheses (from operatorsBeforeParentheses)
      lastParenthesisSolution, // currentNumString (what was solved inside the last set of parentheses)
      nextOperator
    ); // operator that was just pressed
    lastParenthesisSolution = "";
  } else if (isValidNumString(currentNumString)) {
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

function handlePercentage(numObject) {
  const operator = numObject.numValue[0];
  let numToChange = math.chain(Number(numObject.numValue.slice(1))).divide(100);
  numObject.numValue = operator + numToChange.toString();
  updateAppropriateString(numObject);
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
  overwriteCurrentNumString = false;
}

function handleSquared(numObject) {
  const operator = numObject.numValue[0];
  const base = Number(numObject.numValue.slice(1));
  const updatedNum = math.pow(base, 2).toString();
  numObject.numValue = operator + updatedNum;
  updateAppropriateString(numObject);
}

function handleCubed(numObject) {
  const operator = numObject.numValue[0];
  const base = Number(numObject.numValue.slice(1));
  const updatedNum = math.pow(base, 3).toString();
  numObject.numValue = operator + updatedNum;
  updateAppropriateString(numObject);
}

function handleFactorial(numObject) {
  const numArray = [];
  let factor = numObject.numValue;
  while (factor >= 1) {
    numArray.push(factor);
    factor -= 1;
  }
  const solution = numArray.reduce((accum, currentVal) => {
    return math.chain(accum).multiply(currentVal);
  });
  numObject.numValue = solution.toString();
  updateAppropriateString(numObject);
}

function handleInverseFraction(numObject) {
  const operator = numObject.numValue[0];
  const denominator = Number(numObject.numValue.slice(1));
  const inverseFractionAsDecimal = math
    .chain(100)
    .divide(denominator)
    .divide(100)
    .toString();
  numObject.numValue = operator + inverseFractionAsDecimal;
  updateAppropriateString(numObject);
}

function setBase(numObject) {
  base = numObject.numValue.slice(1);
  currentNumString = "";
}

function solveCustomExponents(baseNum, exponentNum) {
  const numObject = determineCorrectNumString();
  const operator = numObject.numValue[0];
  const solution = math.pow(Number(baseNum), Number(exponentNum)).toString();
  numObject.numValue = operator + solution;
  updateAppropriateString(numObject);
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
  theta = giveDefaultOperator(currentNumString)[0];
}

function handleTrig() {
  let trigSolution;
  const operator = theta[0];
  if (trig === "sin") {
    trigSolution = math.sin(theta.slice(1));
  } else if (trig === "cos") {
    trigSolution = math.cos(theta.slice(1));
  } else {
    trigSolution = math.tan(theta.slice(1));
  }
  trigSolution = operator + trigSolution.toString();
  trig = "";
  theta = "";
  return trigSolution;
}

////

//////  Call Back Functions for Parentheses  //////

function handleOpenParenthesis() {
  if (base) {
    return false; // prohibit button from animating
  }
  if (lastParenthesisSolution) {
    reduceEquationString(
      grabLastStringInStack(equationStack), // last string from the stack
      lastParenthesisSolution[0], // the operator that went in front of the last set of parentheses (from operatorsBeforeParentheses)
      lastParenthesisSolution, // what was solved inside the last set of parentheses
      "=" // = acts as nextOperator because an ( character is not an operator
    );
    lastParenthesisSolution = "";
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
  if (lastParenthesisSolution) {
    // if we close a set of parenthesis and have a set unaccounted for (lastParenthesisSolution), then that means we are closing two sets of parenthesis in a row.  The inner set has already been solved for and that's what's sitting in lastParenthesisSolution.  This current set now is closing and so we want to remove it from the equationStack and store it with its appropriate operator in lastParenthesisSolution
    currentNumString = lastParenthesisSolution;
    currentOperator = lastParenthesisSolution[0];
  } else if (!isValidNumString(currentNumString)) {
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
  const newParenthesisSolution = equationStack.pop(); // We're now storing whatever equation string was just reduced as lastParenthesisSolution so we don't want it in equationStack anymore
  const operatorBeforeParenthesis = operatorsBeforeParentheses.pop(); // make sure we put the operator that was outside the opened parenthesis in front of lastParenthesisSolution.  This will also make sure handleEquals() doesn't run infinitely since we are calling handleCloseParenthesis() on a loop that is based on the length of operatorsBeforeParentheses inside handleEquals()
  lastParenthesisSolution = replaceOperator(
    newParenthesisSolution,
    operatorBeforeParenthesis
  );
  currentNumString = "";
  currentOperator = "";
  return true;
}

//////  Call Back Function to handle Positive/Negative Numbers  //////

function makePosOrNeg(numObject) {
  if (
    numObject.numValue.length < 2 ||
    (numObject.numValue.length === 2 && numObject.numValue[1] === "0")
  ) {
    blinkDisplay("0");
    return;
  }
  if (numObject.numValue[1] === "-") {
    numObject.numValue = `${numObject.numValue.slice(
      0,
      1
    )}${numObject.numValue.slice(2)}`;
  } else {
    numObject.numValue = `${numObject.numValue.slice(
      0,
      1
    )}-${numObject.numValue.slice(1)}`;
  }
  updateAppropriateString(numObject);
}

//////  Call Back Function for Equals Sign  //////

function handleEquals() {
  if (lastParenthesisSolution) {
    handleLastParenthesis();
  }
  if (equationStack.length > 1) {
    while (operatorsBeforeParentheses.length > 0) {
      handleCloseParenthesis();
    }
    handleLastParenthesis();
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

function handleLastParenthesis() {
  const equationString = grabLastStringInStack(equationStack);
  reduceEquationString(
    equationString,
    lastParenthesisSolution[0],
    lastParenthesisSolution,
    "="
  );
  lastParenthesisSolution = "";
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
    lastParenthesisSolution === "" &&
    !trig &&
    !base
  ) {
    blinkDisplay("0"); // there's nothing to clear
    return;
  }
  if (isValidNumString(currentNumString)) {
    if (
      equationStack[0] !== "+0" ||
      equationStack.length > 1 ||
      lastParenthesisSolution
    ) {
      currentNumString = giveDefaultOperator(currentNumString)[0]; // we're just clearing the current number, but keeping its operator, and switching this button's functionality to allClear() in case it's clicked a second time
      switchToAllClear();
    } else {
      currentNumString = "";
    }
  } else {
    currentNumString = ""; // then there's more stuff to clear in the stack, but this currentNumString isn't valid anyway, so just set it to an empty string and switch the button's functionality to allClear() in case it's clicked a second time
    switchToAllClear();
  }
  if (theta || base) {
    // customExp = ""; // I think these two values customExp and theta could actually just be currentNumString in the event that line 704 is true
    theta = "";
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
  lastParenthesisSolution = "";
  base = "";
  trig = "";
  theta = "";
  updateDisplay(currentNumString);
  switchToClear();
  equationStringHasReduced = false; // so if new parenthesis are opened immediately after this button is pressed, their value is added to zero not multiplied by it. i.e. (3 + 4) (5 - 2) === +0+7 *3 not +0*7 *3
  clearButtons.forEach((button) => {
    buttonAnimation(button);
  });
}

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

function updateDisplay(numString) {
  if (numString.length === 0) {
    numString = grabLastNum(grabLastStringInStack(equationStack));
  }
  const firstChar = numString[0];
  if (isOperator(firstChar)) {
    numString = numString.slice(1);
  }
  displayNum.value = numString;
}

// helper functions

function determineCorrectNumString() {
  // determine the correct numString we are changing, and return a string with its name.  Use that information
  // inside whatever special button function is calling this and use that to replace the correct numString
  // in here, at the top, check for trig.  if we have trig to solve, solve it and set currentNumSTring as that trig answer.
  // then continue down through the steps to prioritize currentNumString (which was just reassigned the trig value) as numToChange.stringValue.
  if (trig && !isValidNumString(theta)) {
    return;
  } else if (trig) {
    currentNumString = handleTrig();
  }
  const numToChange = { stringValue: "" };
  if (isValidNumString(currentNumString)) {
    numToChange.numValue = giveDefaultOperator(currentNumString);
    numToChange.stringValue = "currentNumString";
    return numToChange;
  } else if (lastParenthesisSolution) {
    numToChange.numValue = giveDefaultOperator(lastParenthesisSolution);
    numToChange.stringValue = "lastParenthesisSolution";
    return numToChange;
  }
  return numToChange;
}

function updateAppropriateString(numObject) {
  if (numObject.stringValue === "currentNumString") {
    currentNumString = numObject.numValue;
    updateDisplay(currentNumString);
  } else if (numObject.stringValue === "lastParenthesisSolution") {
    lastParenthesisSolution = numObject.numValue;
    updateDisplay(lastParenthesisSolution);
  }
  overwriteCurrentNumString = true;
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

function determineStoredOperator(currentNumString) {
  let storedOperator;
  if (currentNumString.length === 0 && !equationStringHasReduced) {
    storedOperator = "+";
  } else if (
    currentNumString.length === 1 &&
    !isValidNumString(currentNumString)
  ) {
    storedOperator = currentNumString;
  } else {
    storedOperator = "*";
  }
  return storedOperator;
}

function replaceOperator(currentNumString, newOperator) {
  currentNumString = `${newOperator}${currentNumString.slice(1)}`;
  return currentNumString;
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
