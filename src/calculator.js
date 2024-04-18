//////// Constants ////////

const NUMS = "0123456789.";
const OPERATORS = "+÷-xX/*=Enter";
const HIGHER_ORDER_OPERATIONS = "Xx*÷/";
const LOWER_ORDER_OPERATIONS = "+-";
const EQUALS_OPERATORS = "=Enter";

//////// Calculator Class ////////

class Calculator {
  equationStack;
  currentNumString;
  numToDisplay;
  base;
  trig;
  equationStringHasReduced;
  overwriteCurrentNumString;
  clearAll;

  constructor() {
    this.equationStack = ["+0"];
    this.currentNumString = "";
    this.numToDisplay = "0";
    this.base = "";
    this.trig = "";
    this.equationStringHasReduced = false;
    this.overwriteCurrentNumString = false;
    this.clearAll = false;
  }

  handleNums(givenNum) {
    this.switchToClear(); // switch the clear button back to clear from A/C in the event that was pushed
    if (this.overwriteCurrentNumString) {
      this.giveDefaultOperator(); // anytime this.overwriteCurrentNumString is true, this.currentNumString already has an operator ;)
      this.currentNumString = this.currentNumString[0];
      this.overwriteCurrentNumString = false;
    }
    this.giveDefaultOperator();
    this.currentNumString = this.concatOrReplace(
      this.currentNumString,
      givenNum
    );
    this.updateNumToDisplay();
  }

  handleOperators(givenOperator) {
    if ((this.base || this.trig) && !this.isValidNumString()) {
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
    if (this.isValidNumString()) {
      this.giveDefaultOperator();
      this.currentNumString =
        this.currentNumString[0] +
        Number(this.currentNumString.slice(1)).toString(); // removes any unnecessary trailing 0's after a decimal point i.e. 12.00400 becomes 12.004
      this.reduceEquationString(givenOperator);
    } else {
      this.updateNumToDisplay();
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

  giveDefaultOperator() {
    if (
      this.currentNumString === "" ||
      !this.isOperator(this.currentNumString[0])
    ) {
      this.currentNumString = `+${this.currentNumString}`;
    }
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

  grabLastStringInStack() {
    return this.equationStack[this.equationStack.length - 1];
  }

  isOperator(char) {
    return OPERATORS.includes(char);
  }

  updateNumToDisplay() {
    if (this.clearAll) {
      this.numToDisplay = "0";
      return;
    }
    let numString;
    if (this.isValidNumString()) {
      numString = this.currentNumString;
    } else {
      numString = this.grabLastNum(this.grabLastStringInStack());
    }
    const firstChar = numString[0];
    if (this.isOperator(firstChar)) {
      numString = numString.slice(1);
    }
    this.numToDisplay = numString;
  }

  /// Call Back Functions for non number/operator characters //////

  handlePercentage(num) {
    const percentAsDecimal = math.chain(num).divide(100);
    return percentAsDecimal;
  }

  handlePi() {
    this.giveDefaultOperator();
    const operator = this.currentNumString[0];
    const pi = math.pi.toString();
    this.currentNumString = operator + pi;
    this.updateNumToDisplay();
    this.overwriteCurrentNumString = true;
  }

  handleEuler() {
    this.giveDefaultOperator();
    const operator = this.currentNumString[0];
    const euler = math.e.toString();
    this.currentNumString = operator + euler;
    this.updateNumToDisplay();
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

  determineTrigFunction(trigString) {
    this.trig = trigString;
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
    const operatorToStore = this.determineStoredOperator();
    if (this.isValidNumString()) {
      this.giveDefaultOperator();
      this.currentNumString += operatorToStore;
      this.equationStack[this.equationStack.length - 1] +=
        this.currentNumString; // store the last num as well as the operator right before the parenthesis in equationStack so we can deal with the parenthesis first
    } else {
      this.equationStack[this.equationStack.length - 1] += operatorToStore; // if currentNumString is not valid, just store the operator outside these parentheses we're opening
    }
    this.equationStack.push("+0");
    this.currentNumString = "";
    this.equationStringHasReduced = false;
    return true;
  }

  handleCloseParenthesis() {
    if (this.equationStack.length === 1) {
      // if there are no open parenthesis, we can't close one
      return false;
    }
    if (!this.isValidNumString()) {
      this.validateCurrentNumString();
    }
    this.giveDefaultOperator();

    // now solve what's in the parenthesis that we are closing
    // to do that, reduceEquationString with what we have for currentNumString, currentOperator, equationStack[lastIndex], and use '=' as nextOperator.
    this.reduceEquationString("="); // this will update the display to whatever the solution of the parenthesis math was
    const newParenthesisSolution = this.equationStack.pop(); // We're now storing whatever equation string was just reduced so we don't want it in equationStack anymore
    const lastNumStringInStack = this.grabLastStringInStack(); // last numString of equation stack
    const operatorBeforeParenthesisSolution =
      lastNumStringInStack[lastNumStringInStack.length - 1]; // last character of lastNumStringInStack
    this.equationStack[this.equationStack.length - 1] =
      lastNumStringInStack.slice(0, lastNumStringInStack.length - 1); // replace the last numString in the equationStack with that last character now removed
    this.currentNumString = this.replaceOperator(
      newParenthesisSolution,
      operatorBeforeParenthesisSolution
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
    while (this.equationStack.length > 1) {
      this.handleCloseParenthesis();
    }
    this.giveDefaultOperator();
    if (!this.isValidNumString()) {
      this.validateCurrentNumString();
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
    let equationString = this.grabLastStringInStack();
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
    this.giveDefaultOperator();
    this.equationStack[this.equationStack.length - 1] += this.currentNumString;
    this.updateNumToDisplay();
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
    if (
      !this.isValidNumString() &&
      this.equationStack[0] === "+0" &&
      this.equationStack.length === 1 &&
      !this.trig &&
      !this.base
    ) {
      return;
    }
    if (this.isValidNumString()) {
      if (this.equationStack[0] !== "+0" || this.equationStack.length > 1) {
        this.giveDefaultOperator();
        this.currentNumString = this.currentNumString[0]; // we're just clearing the current number, but keeping its operator, and switching this button's functionality to allClear() in case it's clicked a second time
        this.switchToAllClear();
      } else {
        this.currentNumString = "";
      }
    } else {
      this.currentNumString = ""; // then there's more stuff to clear in the stack, but this currentNumString isn't valid anyway, so just set it to an empty string and switch the button's functionality to allClear() in case it's clicked a second time
      this.switchToAllClear();
    }
    this.updateNumToDisplay();
  }

  switchToAllClear() {
    this.clearAll = true;
  }

  switchToClear() {
    this.clearAll = false;
  }

  allClear() {
    this.currentNumString = "";
    this.equationStack.length = 0;
    this.equationStack.push("+0");
    this.base = "";
    this.trig = "";
    this.updateNumToDisplay();
    this.switchToClear();
    this.equationStringHasReduced = false; // so if new parenthesis are opened immediately after this button is pressed, their value is added to zero not multiplied by it. i.e. (3 + 4) (5 - 2) === +0+7 *3 not +0*7 *3
  }

  updateNumStringInPlace(operationToPerform) {
    if (!this.isValidNumString()) {
      const lastNumStringFromStack = this.grabLastNum(
        this.grabLastStringInStack()
      );
      this.equationStack[this.equationStack.length - 1] = this.cutFromNumString(
        this.grabLastStringInStack(),
        lastNumStringFromStack.length
      );
      this.currentNumString = lastNumStringFromStack;
    }
    const operator = this.currentNumString[0];
    const num = this.currentNumStringAsNumber();
    const newNumString = operationToPerform(num).toString();
    this.currentNumString = operator + newNumString;
    this.updateNumToDisplay();
    this.overwriteCurrentNumString = true;
  }

  // helper functions

  isValidNumString() {
    if (
      !(
        this.currentNumString.length === 0 ||
        (this.currentNumString.length === 1 &&
          this.isOperator(this.currentNumString))
      )
    ) {
      return true;
    }
    return false;
  }

  validateCurrentNumString() {
    this.giveDefaultOperator();
    const operator = this.currentNumString[0];
    if (HIGHER_ORDER_OPERATIONS.includes(operator)) {
      this.currentNumString = `${operator}1`;
    } else {
      this.currentNumString = `${operator}0`;
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

  determineStoredOperator() {
    let storedOperator;
    if (this.currentNumString.length === 0 && !this.equationStringHasReduced) {
      storedOperator = "+";
    } else if (this.currentNumString.length === 1 && !this.isValidNumString()) {
      storedOperator = this.currentNumString;
    } else {
      storedOperator = "*";
    }
    return storedOperator;
  }

  replaceOperator(numString, newOperator) {
    numString = `${newOperator}${numString.slice(1)}`;
    return numString;
  }

  currentNumStringAsNumber() {
    return Number(this.currentNumString.slice(1));
  }
}

export default Calculator;
