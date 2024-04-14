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
    this.switchToClear(); // switch the clear button back to clear from A/C in the event that was pushed
    if (this.overwriteCurrentNumString) {
      this.currentNumString = this.giveDefaultOperator(this.currentNumString);
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
      this.solveCustomExponents();
    }
    if (this.trig) {
      this.handleTrig();
    }
    if (this.overwriteCurrentNumString) {
      this.overwriteCurrentNumString = false;
    }
    if (EQUALS_OPERATORS.includes(givenOperator)) {
      this.handleEquals();
      return;
    }
    if (this.isValidNumString(this.currentNumString)) {
      this.currentNumString = this.giveDefaultOperator(this.currentNumString);
      this.currentNumString =
        this.currentNumString[0] +
        Number(this.currentNumString.slice(1)).toString(); // removes any unnecessary trailing 0's after a decimal point i.e. 12.00400 becomes 12.004
      this.reduceEquationString(givenOperator);
    } else {
      this.blinkDisplay(
        this.grabLastNum(this.grabLastStringInStack(this.equationStack)).slice(
          1
        )
      );
    }
    this.currentNumString = givenOperator;
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
      numString = this.grabLastNum(
        this.grabLastStringInStack(this.equationStack)
      );
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

  /// Call Back Functions for non number/operator characters //////

  handlePercentage(num) {
    const percentAsDecimal = math.chain(num).divide(100);
    return percentAsDecimal;
  }

  handlePi() {
    const operator = this.giveDefaultOperator(this.currentNumString)[0];
    const pi = math.pi.toString();
    this.currentNumString = operator + pi;
    this.updateDisplay(this.currentNumString);
    this.overwriteCurrentNumString = true;
  }

  handleEuler() {
    const operator = this.giveDefaultOperator(this.currentNumString)[0];
    const euler = math.e.toString();
    this.currentNumString = operator + euler;
    this.updateDisplay(this.currentNumString);
    this.overwriteCurrentNumString = true;
  }

  handleRaiseEuler() {
    this.handleEuler();
    this.base = this.currentNumString;
  }

  handleSquared(num) {
    const squaredNumString = math.pow(num, 2);
    return squaredNumString;
  }

  handleCubed(num) {
    const cubedNumString = math.pow(num, 3);
    return cubedNumString;
  }

  handleFactorial(num) {
    const factorialString = math.factorial(num);
    return factorialString;
  }

  handleInverseFraction(num) {
    const inverseFractionAsDecimal = math.chain(100).divide(num).divide(100);
    return inverseFractionAsDecimal;
  }

  setBase() {
    this.base = this.currentNumString;
    this.currentNumString = "";
  }

  solveCustomExponents() {
    const operator = this.base[0];
    const solution = math
      .pow(Number(this.base.slice(1)), Number(this.currentNumString))
      .toString();
    this.currentNumString = operator + solution;
    this.base = "";
  }

  ////// Trig Functions /////////

  determineTrigFunction(button) {
    this.trig = button.getAttribute("id");
  }

  handleTrig() {
    let trigSolution;
    const operator = this.currentNumString[0];
    const theta = Number(this.currentNumString.slice(1));
    if (this.trig === "sin") {
      trigSolution = math.sin(theta);
    } else if (this.trig === "cos") {
      trigSolution = math.cos(theta);
    } else {
      trigSolution = math.tan(theta);
    }
    trigSolution = operator + trigSolution.toString();
    this.trig = "";
    this.currentNumString = trigSolution;
  }

  //////  Call Back Functions for Parentheses  //////

  handleOpenParenthesis() {
    if (this.base) {
      return false; // prohibit button from animating
    }
    const operatorToStore = this.determineStoredOperator(this.currentNumString);
    this.operatorsBeforeParentheses.push(operatorToStore);
    if (this.isValidNumString(this.currentNumString)) {
      this.currentNumString = this.giveDefaultOperator(this.currentNumString);
      this.equationStack[this.equationStack.length - 1] +=
        this.currentNumString; // store the last num outside the parenthesis in equationStack so we can deal with the parenthesis first
    }
    this.equationStack.push("+0");
    this.currentNumString = "";
    this.equationStringHasReduced = false;
    return true;
  }

  handleCloseParenthesis() {
    if (this.operatorsBeforeParentheses.length === 0) {
      // if there are no open parenthesis, we can't close one
      return false;
    }
    if (!this.isValidNumString(this.currentNumString)) {
      this.currentNumString = this.fixInvalidNumString(this.currentNumString);
    }

    this.currentNumString = this.giveDefaultOperator(this.currentNumString);

    // now solve what's in the parenthesis that we are closing
    // to do that, reduceEquationString with what we have for currentNumString, currentOperator, equationStack[lastIndex], and use '=' as nextOperator.
    this.reduceEquationString("="); // this will update the display to whatever the solution of the parenthesis math was
    const newParenthesisSolution = this.equationStack.pop(); // We're now storing whatever equation string was just reduced so we don't want it in equationStack anymore
    const operatorBeforeParenthesis = this.operatorsBeforeParentheses.pop(); // make sure we put the operator that was outside the opened parenthesis in front.  This will also make sure handleEquals() doesn't run infinitely since we are calling handleCloseParenthesis() on a loop that is based on the length of operatorsBeforeParentheses inside handleEquals()
    this.currentNumString = this.replaceOperator(
      newParenthesisSolution,
      operatorBeforeParenthesis
    );
    this.overwriteCurrentNumString = true;
    return true;
  }

  //////  Call Back Function to handle Positive/Negative Numbers  //////

  makePosOrNeg(num) {
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

  handleEquals() {
    if (this.equationStack.length > 1) {
      while (this.operatorsBeforeParentheses.length > 0) {
        this.handleCloseParenthesis();
      }
    }
    if (
      !this.isValidNumString(this.giveDefaultOperator(this.currentNumString))
    ) {
      this.currentNumString = this.fixInvalidNumString(this.currentNumString);
    }
    this.reduceEquationString("=");
    this.currentNumString = this.equationStack[0];
    this.equationStack[0] = "+0";
    this.switchToClear(); // in case clear button says A/C because there's now nothing to clear
    this.equationStringHasReduced = false;
    this.overwriteCurrentNumString = true;
  }

  //////  Calculator Functionality //////

  reduceEquationString(nextOperator) {
    let currentOperator = this.currentNumString[0];
    let equationString = this.grabLastStringInStack(this.equationStack);
    if (!this.equationStringHasReduced) {
      this.equationStringHasReduced = true;
    }
    while (
      equationString.length !== 0 &&
      !this.isHigherOrder(currentOperator, nextOperator)
    ) {
      const lastNumString = this.grabLastNum(equationString); // this will be an operator and number, i.e. '+0'
      const lastOperator = lastNumString[0];
      const lastNum = lastNumString.slice(1); // get rid of the operator ...
      equationString = this.cutFromNumString(
        equationString,
        lastNumString.length
      );
      this.equationStack[this.equationStack.length - 1] = equationString; // cut out the last num from the equation string inside this.equationStack since we're dealing with it below
      const num1 = Number(lastNum);
      const num2 = Number(this.currentNumString.slice(1));
      const solution = this.calculate(num1, num2, currentOperator);
      this.currentNumString = `${lastOperator}${solution.toString()}`;
      currentOperator = lastOperator;
    } // if we can't solve it yet, or if the last string in the stack is empty, concatenate currentNumString to the end of the last string in equationStack
    this.currentNumString = this.giveDefaultOperator(this.currentNumString);
    this.equationStack[this.equationStack.length - 1] += this.currentNumString;
    this.updateDisplay(this.currentNumString);
    this.blinkDisplay(this.currentNumString.slice(1));
  }

  calculate(num1, num2, currentOperator) {
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

  clear() {
    // perhaps clear and allClear should take in the DOM element whose event called them so we can change the text and animate the buttons
    if (
      !this.isValidNumString(this.currentNumString) &&
      this.equationStack[0] === "+0" &&
      this.equationStack.length === 1 &&
      !this.trig &&
      !this.base
    ) {
      this.blinkDisplay("0"); // there's nothing to clear
      return;
    }
    if (this.isValidNumString(this.currentNumString)) {
      if (this.equationStack[0] !== "+0" || this.equationStack.length > 1) {
        this.currentNumString = this.giveDefaultOperator(
          this.currentNumString
        )[0]; // we're just clearing the current number, but keeping its operator, and switching this button's functionality to allClear() in case it's clicked a second time
        this.switchToAllClear();
      } else {
        this.currentNumString = "";
      }
    } else {
      this.currentNumString = ""; // then there's more stuff to clear in the stack, but this currentNumString isn't valid anyway, so just set it to an empty string and switch the button's functionality to allClear() in case it's clicked a second time
      this.switchToAllClear();
    }
    this.updateDisplay("0");
    this.buttonAnimation(clearButton);
  }

  switchToAllClear() {
    // perhaps every method pertaining to clearing should take in the DOM element whose event called them so we can change the text and animate the buttons
    clearButton.innerText = "A/C";
    clearButton.removeEventListener("click", this.clear);
    clearButton.addEventListener("click", () => {
      this.allClear();
    });
  }

  switchToClear() {
    clearButton.innerText = "C";
    clearButton.removeEventListener("click", this.allClear);
    clearButton.addEventListener("click", () => {
      this.clear();
    });
  }

  allClear() {
    this.currentNumString = "";
    this.equationStack.length = 0;
    this.equationStack.push("+0");
    this.base = "";
    this.trig = "";
    this.updateDisplay(this.currentNumString);
    this.switchToClear();
    this.equationStringHasReduced = false; // so if new parenthesis are opened immediately after this button is pressed, their value is added to zero not multiplied by it. i.e. (3 + 4) (5 - 2) === +0+7 *3 not +0*7 *3
    this.buttonAnimation(clearButton);
  }

  updateNumStringInPlace(functionToUpdateNumString, eventTarget) {
    if (!this.isValidNumString(this.currentNumString)) {
      const lastNumStringFromStack = this.grabLastNum(
        this.grabLastStringInStack(this.equationStack) // Is there any time grabLastStringInStack is not referring to this.equationStack?  If not, we shouldn't need to pass an argument to it
      );
      this.equationStack[this.equationStack.length - 1] = this.cutFromNumString(
        this.grabLastStringInStack(this.equationStack),
        lastNumStringFromStack.length
      );
      this.currentNumString = lastNumStringFromStack;
    }
    const operator = this.currentNumString[0];
    const num = Number(this.removeOperator(this.currentNumString));
    const newNumString = functionToUpdateNumString(num).toString();
    this.currentNumString = operator + newNumString;
    this.buttonAnimation(eventTarget);
    this.updateDisplay(this.currentNumString);
    this.overwriteCurrentNumString = true;
  }

  // helper functions

  isValidNumString(localNumString) {
    if (
      !(
        localNumString.length === 0 ||
        (localNumString.length === 1 && this.isOperator(localNumString))
      )
    ) {
      return true;
    }
    return false;
  }

  fixInvalidNumString(invalidNumString) {
    const operator = this.giveDefaultOperator(invalidNumString)[0];
    if (HIGHER_ORDER_OPERATIONS.includes(operator)) {
      return `${operator}1`;
    } else {
      return `${operator}0`;
    }
  }

  cutFromNumString(numString, lengthToCut) {
    const index = numString.length - lengthToCut;
    const newString = numString.slice(0, index);
    return newString;
  }

  isDigit(char) {
    return NUMS.includes(char);
  }

  isHigherOrder(currentOperator, nextOperator) {
    return (
      LOWER_ORDER_OPERATIONS.includes(currentOperator) &&
      HIGHER_ORDER_OPERATIONS.includes(nextOperator)
    );
  }

  determineStoredOperator(numString) {
    let storedOperator;
    if (numString.length === 0 && !this.equationStringHasReduced) {
      storedOperator = "+";
    } else if (numString.length === 1 && !this.isValidNumString(numString)) {
      storedOperator = numString;
    } else {
      storedOperator = "*";
    }
    return storedOperator;
  }

  replaceOperator(numString, newOperator) {
    numString = `${newOperator}${numString.slice(1)}`;
    return numString;
  }

  removeOperator(numString) {
    return numString.slice(1);
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
