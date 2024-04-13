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

//////// Calculator Class ////////

class Calculator {
  equationStack;
  operatorsBeforeParentheses;
  currentNumString;
  base;
  trig;
  equationStringHasReduced;
  overwriteCurrentNumString;

  constructor() {
    this.equationStack = ["+0"];
    this.operatorsBeforeParentheses = [];
    this.currentNumString = "";
    this.base = "";
    this.trig = "";
    this.equationStringHasReduced = false;
    this.overwriteCurrentNumString = false;
  }

  handleNums(givenNum) {
    // switchToClear(); // switch the clear button back to clear from A/C in the event that was pushed
    if (this.overwriteCurrentNumString) {
      this.currentNumString = this.giveDefaultOperator(currentNumString);
      this.currentNumString = this.currentNumString[0];
      this.overwriteCurrentNumString = false;
    }
    this.currentNumString = this.giveDefaultOperator(this.currentNumString);
    this.currentNumString = this.concatOrReplace(
      this.currentNumString,
      givenNum
    );
    this.updateDisplay(this.currentNumString);
  }

  handleOperators(givenOperator) {
    if (
      (this.base || this.trig) &&
      !this.isValidNumString(this.currentNumString)
    ) {
      return;
    }
    if (this.base) {
      this.solveCustomExponents(base, currentNumString);
    }
    if (this.trig) {
      this.handleTrig();
    }
    if (this.overwriteCurrentNumString) {
      this.overwriteCurrentNumString = false;
    }
    const equationString = this.grabLastStringInStack(this.equationStack); // last string in the stack
    const nextOperator = givenOperator;
    if (EQUALS_OPERATORS.includes(nextOperator)) {
      this.handleEquals();
      return;
    }
    if (this.isValidNumString(this.currentNumString)) {
      this.currentNumString = this.giveDefaultOperator(this.currentNumString);
      this.currentNumString =
        this.currentNumString[0] +
        Number(this.currentNumString.slice(1)).toString(); // removes any unnecessary trailing 0's after a decimal point i.e. 12.00400 becomes 12.004
      const currentOperator = this.currentNumString[0];
      reduceEquationString(
        equationString,
        currentOperator,
        this.currentNumString,
        nextOperator
      );
    } else {
      this.blinkDisplay(
        this.grabLastNum(this.grabLastStringInStack(this.equationStack)).slice(
          1
        )
      );
    }

    this.currentNumString = nextOperator;
  }

  concatOrReplace(numString, newNum) {
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

  giveDefaultOperator(numString) {
    if (numString === "" || !this.isOperator(numString[0])) {
      numString = `+${numString}`;
    }
    return numString;
  }

  grabLastNum(equationString) {
    let index = equationString.length - 1;
    let lastNum;
    while (index >= 0) {
      if (this.isOperator(equationString[index])) {
        if (this.isOperator(equationString[index - 1])) {
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

  grabLastStringInStack(givenEquationStack) {
    return givenEquationStack[givenEquationStack.length - 1];
  }

  isOperator(char) {
    return OPERATORS.includes(char);
  }

  updateDisplay(numString) {
    if (numString.length === 0) {
      numString = this.grabLastNum(this.grabLastStringInStack(equationStack));
    }
    const firstChar = numString[0];
    if (this.isOperator(firstChar)) {
      numString = numString.slice(1);
    }
    displayNum.value = numString;
    this.blinkDisplay(numString);
  }

  blinkDisplay(numString) {
    displayNum.value = " ";
    setTimeout(() => {
      displayNum.value = numString;
    }, 30);
  }

  buttonAnimation(button) {
    button.classList.add("key-pressed");
    setTimeout(() => {
      button.classList.remove("key-pressed");
    }, 150);
  }
}

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

numberButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    myCalculator.handleNums(e.target.innerText);
    myCalculator.buttonAnimation(e.target);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    myCalculator.handleOperators(e.target.innerText);
    myCalculator.buttonAnimation(e.target);
  });
});
