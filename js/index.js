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
const clearButton = document.getElementById("clear"); // clear once clears currentNumString, A/C or clear a second time (change text on button for user to A/C) clears the equationStack back to ['+0'] and sets calculateHasRun back to false
const numberButtons = document.querySelectorAll(".btn__num");
const operatorButtons = document.querySelectorAll(".btn__operator");
const openParenthesis = document.getElementById("open-parenthesis");
const closeParenthesis = document.getElementById("close-parenthesis");
const posOrNeg = document.getElementById("toggle-negative");
const displayNum = document.getElementById("display-text");
const equationStack = ["+0"];
const operatorStack = [];
let currentNumString = "";
let nextOperator = "";
let lastParenthesisSolution = "";
let calculateHasRun = false;

////// Click Event Listeners //////

// number buttons //

numberButtons.forEach((button) => {
  button.addEventListener("click", handleNums);
});

posOrNeg.addEventListener("click", makePosOrNeg);

// operator buttons //

operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperators);
});

// text buttons //

openParenthesis.addEventListener("click", handleOpenParenthesis);

closeParenthesis.addEventListener("click", handleCloseParenthesis);

clearButton.addEventListener("click", clear);

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
  clearButton.removeEventListener("click", allClear);
  clearButton.addEventListener("click", clear);
  clearButton.innerText = "C";
  buttonAnimation(e.target);
  currentNumString += e.target.innerText;
  updateDisplay(currentNumString);
}

function handleOperators(e) {
  buttonAnimation(e.target);
  let equationString = equationStack[equationStack.length - 1]; // last string in the stack
  nextOperator = e.target.innerText;
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
    let currentOperator = currentNumString[0];
    calculate(equationString, currentOperator, currentNumString, nextOperator);
  }
  currentNumString = nextOperator;
}

//////  Call Back Functions for Parentheses  //////

function handleOpenParenthesis() {
  if (lastParenthesisSolution) {
    calculate(
      equationStack[equationStack.length - 1], // last string from the stack
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
    equationStack[equationStack.length - 1] += currentNumString;
  }
  equationStack.push("+0");
  currentNumString = "";
  calculateHasRun = false;
}

function handleCloseParenthesis() {
  if (lastParenthesisSolution) {
    // if we close a set of parenthesis and have a set unaccounted for (lastParenthesisSolution), then that means we are closing two sets of parenthesis in a row.  The inner set has already been solved for and that's what's sitting in lastParenthesisSolution.  This current set now is closing and so we want to remove it from the equationStack and store it with its appropriate operator in lastParenthesisSolution
    calculate(
      equationStack[equationStack.length - 1], // last string from the stack
      lastParenthesisSolution[0], // the operator that went in front of the last set of parentheses (from operatorStack)
      lastParenthesisSolution, // what was solved inside the last set of parentheses
      "=" // = acts as nextOperator because an ( character is not an operator
    );
    lastParenthesisSolution = "";
    lastEquationString = equationStack.pop(); // we're now storing whatever the last equationString was as lastParenthesisSolution so we don't want it in equationStack anymore
    operatorFromStack = operatorStack.pop();
    lastEquationString = replaceOperator(lastEquationString, operatorFromStack);
    lastParenthesisSolution = lastEquationString;
  } else if (!isValidNumString(currentNumString)) {
    return;
  } else {
    equationString = equationStack[equationStack.length - 1]; // this is what was in the parenthesis so far...
    currentNumString = giveDefaultOperator(currentNumString);
    currentOperator = currentNumString[0];
    calculate(equationString, currentOperator, currentNumString, "="); // this will update the display to whatever the solution of the parenthesis math was
    operatorFromStack = operatorStack.pop(); // then, these next steps will store the result of what was in the parenthesis to lastParenthesisSolution
    currentNumString = equationStack.pop();
    currentNumString = replaceOperator(currentNumString, operatorFromStack);
    lastParenthesisSolution = currentNumString;
    currentNumString = "";
    currentOperator = "";
  }
}

//////  Call Back Function to handle Positive/Negative Numbers  //////

function makePosOrNeg() {
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
  // the below code should be if = is hit.  Build a while loop that runs as long as
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

function clear(event) {
  currentNumString = "";
  updateDisplay("+0");
  if (equationStack.length === 1 && equationStack[0] === "+0") {
    return;
  }
  clearButton.innerText = "A/C";
  event.target.removeEventListener("click", clear);
  event.target.addEventListener("click", allClear);
}

function allClear(event) {
  currentNumString = "";
  equationStack.length = 0;
  equationStack.push("+0");
  updateDisplay(currentNumString);
  clearButton.innerText = "C";
  event.target.removeEventListener("click", allClear);
  event.target.addEventListener("click", clear);
  calculateHasRun = false; // so if new parenthesis are opened immediately after this button is pressed, their value is added to zero not multiplied by it. i.e. (3 + 4) (5 - 2) === +0+7 *3 not +0*7 *3
}

function isValidNumString(currentNumString) {
  if (
    !(
      currentNumString.length === 0 ||
      (currentNumString.length === 1 && isOperator(currentNumString))
    )
  ) {
    return true;
  }
  return false;
}

function updateDisplay(numString) {
  if (numString.length === 0) {
    numString = grabLastNum(equationStack[equationStack.length - 1]);
  }
  const firstChar = numString[0];
  if (isOperator(firstChar)) {
    numString = numString.slice(1);
  }
  displayNum.value = numString;
}

// helper functions

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
  if (!isOperator(numString[0])) {
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
  } else if (
    isValidNumString(currentNumString || currentNumString.length === 0)
  ) {
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
