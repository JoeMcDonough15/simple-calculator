const NUMS = "0123456789";
const OPERATORS = "+÷-xX/*=Enter";
const HIGHER_ORDER_OPERATIONS = "Xx*÷/";
const LOWER_ORDER_OPERATIONS = "+-";
const EQUALS_OPERATORS = "=Enter";
// const KEY_NAMES = {
//   1: "one",
//   2: "two",
//   3: "three",
//   4: "four",
//   5: "five",
//   6: "six",
//   7: "seven",
//   8: "eight",
//   9: "nine",
//   0: "zero",
//   "*": "multiply",
//   x: "multiply",
//   X: "multiply",
//   "/": "divide",
//   "+": "plus",
//   "-": "minus",
//   "=": "equals",
//   "(": "open-parenthesis",
//   ")": "close-parenthesis",
//   Enter: "equals",
//   ".": "decimal",
//   Escape: "clear",
// };
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
const displayNum = document.getElementById("display-text");
const equationStack = ["+0"];
const operatorStack = [];
let currentNumString = "";
let lastParenthesisSolution = "";
let calculateHasRun = false;

////// Click Event Listeners //////

// number buttons //

numberButtons.forEach((button) => {
  button.addEventListener("click", handleNums);
});

posOrNegButtons.forEach((button) => {
  button.addEventListener("click", makePosOrNeg);
});

// operator buttons //

operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperators);
});

// non number/operator buttons //

openParenthesisButtons.forEach((button) => {
  button.addEventListener("click", handleOpenParenthesis);
});

closeParenthesisButtons.forEach((button) => {
  button.addEventListener("click", handleCloseParenthesis);
});

clearButtons.forEach((button) => {
  button.addEventListener("click", clear);
});

percentageButtons.forEach((button) => {
  button.addEventListener("click", handlePercentage);
});

// expandable keypad console

expandKeypadButton.addEventListener("click", expandKeypadShell);

////// Keyboard Event Listeners //////

//

//

//

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

function handleNums(e) {
  buttonAnimation(e.target);
  switchToClear(); // switch the clear button back to clear from A/C in the event that was pushed
  currentNumString = giveDefaultOperator(currentNumString);
  if (
    (currentNumString.length === 2 &&
      currentNumString[1] === "0" &&
      e.target.innerText === ".") ||
    (currentNumString.length === 1 && e.target.innerText === ".")
  ) {
    currentNumString = `${currentNumString[0]}0.`;
  } else if (currentNumString.length === 2 && currentNumString[1] === "0") {
    // disallow leading 0's i.e. 000005 could never happen
    currentNumString = e.target.innerText;
  } else {
    currentNumString += e.target.innerText;
  }
  updateDisplay(currentNumString);
}

function handleOperators(e) {
  buttonAnimation(e.target);
  const equationString = grabLastStringInStack(equationStack); // last string in the stack
  const nextOperator = e.target.innerText;
  if (EQUALS_OPERATORS.includes(nextOperator)) {
    // handleEquals(currentNumString);
    return;
  }
  if (lastParenthesisSolution) {
    calculate(
      equationString, // last string from the stack
      lastParenthesisSolution[0], // the operator that went in front of the parentheses (from operatorStack)
      lastParenthesisSolution, // currentNumString (what was solved inside the last set of parentheses)
      nextOperator // operator that was just pressed
    );
    lastParenthesisSolution = "";
  } else if (isValidNumString(currentNumString)) {
    currentNumString = giveDefaultOperator(currentNumString);
    currentNumString =
      currentNumString[0] + Number(currentNumString.slice(1)).toString(); // removes any unnecessary trailing 0's after a decimal point i.e. 12.00400 becomes 12.004
    const currentOperator = currentNumString[0];
    calculate(equationString, currentOperator, currentNumString, nextOperator);
  }
  currentNumString = nextOperator;
}

/// Call Back Functions for non number/operator characters //////

//// Percentage //////

function handlePercentage() {
  let numToChange = giveDefaultOperator(determineCorrectNumString());
  let operator = numToChange[0];
  numToChange /= 100;

  // 1. temporarily remove the operator
  // 2. update the string
  // 3. replace numToChange with the new string including the stored operator from step 1.
}

////

////

//////  Call Back Functions for Parentheses  //////

function handleOpenParenthesis(e) {
  buttonAnimation(e.target);
  if (lastParenthesisSolution) {
    calculate(
      grabLastStringInStack(equationStack), // last string from the stack
      lastParenthesisSolution[0], // the operator that went in front of the last set of parentheses (from operatorStack)
      lastParenthesisSolution, // what was solved inside the last set of parentheses
      "=" // = acts as nextOperator because an ( character is not an operator
    );
    lastParenthesisSolution = "";
  }
  const operatorToStore = determineStoredOperator(currentNumString);
  operatorStack.push(operatorToStore);
  if (isValidNumString(currentNumString)) {
    currentNumString = giveDefaultOperator(currentNumString);
    equationStack[equationStack.length - 1] += currentNumString; // store the last num outside the parenthesis in equationStack so we can deal with the parenthesis first
  }
  equationStack.push("+0");
  currentNumString = "";
  calculateHasRun = false;
}

function handleCloseParenthesis(e) {
  if (operatorStack.length === 0) {
    // if there are no open parenthesis, we can't close one
    return;
  }
  buttonAnimation(e.target);
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
  // to do that, calculate with what we have for currentNumString, currentOperator, equationStack[lastIndex], and use '=' as nextOperator.
  const lastEquationString = grabLastStringInStack(equationStack); // this is what is inside the parenthesis we are closing.
  calculate(lastEquationString, currentOperator, currentNumString, "="); // this will update the display to whatever the solution of the parenthesis math was
  const newParenthesisSolution = equationStack.pop(); // We're now storing whatever was just calculated as lastParenthesisSolution so we don't want it in equationStack anymore
  const operatorFromStack = operatorStack.pop(); // make sure we put the operator that was outside the opened parenthesis in front of lastParenthesisSolution.  This will also make sure handleEquals() doesn't run infinitely since we are calling handleCloseParenthesis() on a loop that is based on the length of operatorStack inside handleEquals()
  lastParenthesisSolution = replaceOperator(
    newParenthesisSolution,
    operatorFromStack
  );
  currentNumString = "";
  currentOperator = "";
}

//////  Call Back Function to handle Positive/Negative Numbers  //////

function makePosOrNeg(e) {
  buttonAnimation(e.target);
  currentNumString = giveDefaultOperator(currentNumString);
  if (currentNumString[1] === "-") {
    currentNumString = `${currentNumString.slice(0, 1)}${currentNumString.slice(
      2
    )}`;
  } else {
    currentNumString = `${currentNumString.slice(
      0,
      1
    )}-${currentNumString.slice(1)}`;
  }
  updateDisplay(currentNumString);
}

//////  Call Back Function for Equals Sign  //////

function handleEquals() {
  // 1. check to see if lastParenthesisSolution.  If so, that has to be sent into calculate() along with whatever is at equationStack[lastIndex].
  // 2. once the stack has been updated to include the lastParenthesisSolution (if it exists), and lastParenthesisSolution === '', we need to check to see if there are any other sets of parenthesis that have not yet closed before = was hit.
  // To do this, check the operatorStack.  Everytime a set of parenthesis opens, we store the operator to the immediate left of the parenthesis inside operatorStack.  So, build a loop that says while operatorStack.length > 0 { keep calling closeParenthesis(), which will pop the equationStack and operatorStack inside its definition, set the result of the last parenthesis to lastParenthesisSolution, calculate() with whatever the last set of parenthesis is}
  // 3.  Since handleCloseParenthesis() will set the last set of parenthetical math to lastParenthesisSolution, we need to check for one lastParenthesisSolution after the loop on step 2 runs.
  // the equationStack has a length greater than 1.
  // currentOperator = operatorStack.pop();
  // currentNumString = equationStack.pop();
  // equationString = equationStack[equationStack.length - 1];
  // calculate(equationString, currentOperator, currentNumString, "=");
}

//////  Calculator Functionality //////

function calculate(
  equationString,
  currentOperator,
  currentNumString,
  nextOperator
) {
  console.log("*************************************");
  console.log("equation string: ", equationString);
  console.log("current operator: ", currentOperator);
  console.log("current number: ", currentNumString.slice(1));
  console.log("next operator: ", nextOperator);
  console.log("last num: ", grabLastNum(equationString).slice(1));
  console.log("last operator: ", grabLastNum(equationString)[0]);
  console.log("*************************************");

  if (!calculateHasRun) {
    calculateHasRun = true;
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
    const solution = solve(num1, num2, currentOperator);
    currentNumString = `${lastOperator}${solution.toString()}`;
    currentOperator = lastOperator;
  } // if we can't solve it yet, or if the last string in the stack is empty, concatenate currentNumString to the end of the last string in equationStack
  currentNumString = giveDefaultOperator(currentNumString);
  equationStack[equationStack.length - 1] += currentNumString;
  updateDisplay(currentNumString);
  console.log("the stack after calculate ran: ", equationStack);
}

function solve(num1, num2, currentOperator) {
  console.log(
    "num1 inside solve(): ",
    num1,
    "current operator inside solve(): ",
    currentOperator,
    "num2 inside solve(): ",
    num2
  );
  let answer;
  if (currentOperator === "+") {
    answer = num1 + num2;
  } else if (currentOperator === "-") {
    answer = num1 - num2;
  } else if (
    currentOperator === "*" ||
    currentOperator === "x" ||
    currentOperator === "X"
  ) {
    answer = num1 * num2;
  } else {
    answer = num1 / num2;
  }
  return answer;
}

function clear() {
  currentNumString = "";
  updateDisplay("+0");
  if (equationStack.length === 1 && equationStack[0] === "+0") {
    return;
  }
  switchToAllClear();
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
  updateDisplay(currentNumString);
  switchToClear();
  calculateHasRun = false; // so if new parenthesis are opened immediately after this button is pressed, their value is added to zero not multiplied by it. i.e. (3 + 4) (5 - 2) === +0+7 *3 not +0*7 *3
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
  if (isValidNumString(currentNumString)) {
    return currentNumString;
  } else if (lastParenthesisSolution) {
    return lastParenthesisSolution;
  } else {
    return grabLastNum(grabLastStringInStack());
  }
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
  if (currentNumString.length === 0 && !calculateHasRun) {
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

//

//

//

//

//

//

//

//

//

//

// const NUMS = ".0123456789";
// const OPERATORS = "+-xX*/=Enter";
// const KEY_NAMES = {
//   1: "one",
//   2: "two",
//   3: "three",
//   4: "four",
//   5: "five",
//   6: "six",
//   7: "seven",
//   8: "eight",
//   9: "nine",
//   0: "zero",
//   "*": "multiply",
//   x: "multiply",
//   X: "multiply",
//   "/": "divide",
//   "+": "plus",
//   "-": "minus",
//   "=": "equals",
//   Enter: "equals",
//   ".": "decimal",
//   Escape: "clear",
// };
// const clearButton = document.getElementById("clear");
// const numberButtons = document.querySelectorAll(".btn__num");
// const operatorButtons = document.querySelectorAll(".btn__operator");
// const displayNum = document.getElementById("display-text");

// let numOfOperators = 0;
// let answer = 0;
// let currentNum = "";
// let previousOperator = "";

// /// click event listeners

// numberButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     currentNum += e.target.innerText;
//     updateDisplay(currentNum);
//     buttonAnimation(button);
//   });
// });

// clearButton.addEventListener("click", (e) => {
//   clear();
//   buttonAnimation(e.target);
// });

// operatorButtons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     updateDisplay(calculate());
//     previousOperator = e.target.innerText;
//     buttonAnimation(button);
//   });
// });

// /// keydown event listeners

// document.addEventListener("keydown", (e) => {
//   if (KEY_NAMES.hasOwnProperty(e.key)) {
//     buttonAnimation(document.getElementById(KEY_NAMES[e.key]));
//     if (NUMS.includes(e.key)) {
//       currentNum += e.key;
//       updateDisplay(currentNum);
//     } else if (OPERATORS.includes(e.key)) {
//       updateDisplay(calculate());
//       previousOperator = e.key;
//     } else if (e.key === "Escape") {
//       clear();
//     }
//   }
// });

// // functions

// function clear() {
//   currentNum = "";
//   answer = 0;
//   previousOperator = "";
//   numOfOperators = 0;
//   updateDisplay(answer);
// }

// function updateDisplay(num) {
//   displayNum.setAttribute("value", num.toString());
// }

// function calculate() {
//   numOfOperators++;
//   if (numOfOperators < 2) {
//     answer = Number(currentNum);
//     currentNum = "";
//   } else {
//     switch (previousOperator) {
//       case "➕":
//       case "+":
//         answer += Number(currentNum);
//         break;
//       case "➖":
//       case "-":
//         answer -= Number(currentNum);
//         break;
//       case "✖️":
//       case "x":
//       case "X":
//       case "*":
//         answer *= Number(currentNum);
//         break;
//       case "➗":
//       case "/":
//         answer /= Number(currentNum);
//         break;
//       default:
//         break;
//     }
//     currentNum = "";
//   }
//   return answer;
// }

// function buttonAnimation(button) {
//   button.classList.add("key-pressed");
//   setTimeout(() => {
//     button.classList.remove("key-pressed");
//   }, 150);
// }
