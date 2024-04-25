//////// Constants ////////

const NUMS = "0123456789.";
const OPERATORS = "+÷-xX/*^tTsScC=Enter";
const HIGHEST_ORDER_OPERATIONS = "^tsc"; // exponents, tan, sin, cos
const HIGHER_ORDER_OPERATIONS = "Xx*÷/";
const LOWER_ORDER_OPERATIONS = "+-";
const MULTIPLIERS = "Xx*";
const DIVISION = "/÷";
const ADDITION = "+";
const SUBTRACTION = "-";
const EXPONENTS = "^";
const TRIG_OPERATORS = "tTsScC";
const SIN_OPERATORS = "sS";
const TAN_OPERATORS = "tT";
const COS_OPERATORS = "cC";
const EQUALS_OPERATORS = "=";

//////// Calculator Class ////////

class Calculator {
  equationStack;
  currentNumString;
  numToDisplay;
  currentEquationStringModified;
  overwriteCurrentNumString;
  clearAll;

  constructor() {
    this.equationStack = ["+0"];
    this.currentNumString = "";
    this.numToDisplay = "0";
    this.currentEquationStringModified = false;
    this.overwriteCurrentNumString = false;
    this.clearAll = false;
  }

  handleNums(givenNum) {
    this.switchToClear(); // switch the clear button back to clear from A/C in the event that was pushed
    if (this.overwriteCurrentNumString) {
      this.currentNumString = this.grabOperatorOfCurrentNumString();
      this.overwriteCurrentNumString = false;
    }
    this.ensureCurrentNumStringHasOperator();
    this.currentNumString = this.concatOrReplace(
      this.currentNumString,
      givenNum
    );
    this.updateNumToDisplay();
  }

  previousOperatorAlreadyStored() {
    // return true or false about whether the last character of the equationString is an operator
    const lastNumStringInStack = this.grabLastStringInStack();
    if (
      this.isOperator(lastNumStringInStack[lastNumStringInStack.length - 1])
    ) {
      return true;
    }
    return false;
  }

  handleOperators(givenOperator) {
    if (this.overwriteCurrentNumString) {
      this.overwriteCurrentNumString = false;
    }
    // ************ HANDLE TRIG ************
    // if the last equationString in the stack already has an operator stored at the end,
    // and the currentNumString is not valid, and the givenOperator is not trig, return because this means we received trig
    // already (that's what caused previousOperator to be stored), and now we have a currentNumString that is not valid so we
    // cannot perform the trig function that was chosen, and now we have received a new operator that is not trig.
    //  We cannot have a non trig operator follow
    // a trig operator. i.e. 5 x tan 45 is ok but 5 tan x 45 should just be
    // 5 tan 45 and we should ignore the x.  Also, 5 x cos ÷ should just be 5 x cos.  And, similarly, 5 cos x should just be 5 cos, which would store
    // x before the cos (5 times cos of some angle we have yet to receive).
    // ****If we just opened parentheses, we could not have a previousOperatorStored because we'd start a new string
    // that would have +0 at the newly added current string of equationStack.

    if (
      this.previousOperatorAlreadyStored() &&
      !this.isValidNumString() &&
      !TRIG_OPERATORS.includes(givenOperator)
    ) {
      return;
    }
    //
    //
    // if the last equationString in the stack already has an operator stored at the end, and the currentNumString
    // is not yet valid, and the newly givenOperator
    // IS trig, that means we received two trigs in a row.  The first trig (say, tan) ordered the previous operator (say, x) to
    // be stored, and now this SECOND trig (say, cos), should just replace tan.  So if we have 5 x tan cos, it should just be
    // 5 x cos and the tan should be forgotten.  If the user wants to nest trig, they must use parentheses.  So that example
    // correctly submitted would be 5 x tan(cos90) + , which would solve the cos of 90 first, then the tan of that, then 5 x that.
    //
    if (this.previousOperatorAlreadyStored() && !this.isValidNumString()) {
      this.currentNumString = givenOperator;
      return;
    }
    if (
      !this.previousOperatorAlreadyStored() &&
      TRIG_OPERATORS.includes(givenOperator)
    ) {
      // if the givenOperator is a trig operator, so long as we don't have an operator stored yet, even if the currentNumString
      // is not valid, we sould run the steps of setting ourselves up to receive an angle theta.
      this.determineAndStorePreviousOperator();
      this.currentNumString = givenOperator;
      return;
    }
    //
    //
    //

    if (EQUALS_OPERATORS.includes(givenOperator)) {
      this.handleEquals();
      return;
    }
    if (this.isValidNumString()) {
      this.currentNumString =
        this.grabOperatorOfCurrentNumString() +
        this.numStringAsNumber().toString(); // turning currentNumString into a number removes any unnecessary trailing 0's after a decimal point i.e. 12.00400 becomes 12.004 before we turn it back into a string
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

  ensureCurrentNumStringHasOperator() {
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
        if (index > 0 && equationString[index - 1] === "e") {
          index -= 2;
          continue;
        } else if (index > 0 && this.isOperator(equationString[index - 1])) {
          lastNum = equationString.slice(index - 1);
        } else {
          lastNum = equationString.slice(index);
        }
        return lastNum;
      }
      index -= 1;
    }
  }

  grabLastStringInStack() {
    return this.equationStack[this.equationStack.length - 1];
  }

  isOperator(char) {
    return OPERATORS.includes(char);
  }

  updateNumToDisplay(numString = null) {
    if (!numString) {
      if (this.isValidNumString()) {
        numString = this.currentNumString;
      } else {
        numString = this.grabLastNum(this.grabLastStringInStack());
      }
    }
    const firstChar = numString[0];
    if (numString.length === 1 && this.isOperator(firstChar)) {
      numString = "0";
    } else if (this.isOperator(firstChar)) {
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
    const operator = this.grabOperatorOfCurrentNumString();
    const pi = math.pi.toString();
    this.currentNumString = operator + pi;
    this.updateNumToDisplay();
    this.overwriteCurrentNumString = true;
  }

  handleEuler() {
    const operator = this.grabOperatorOfCurrentNumString();
    const euler = math.e.toString();
    this.currentNumString = operator + euler;
    this.updateNumToDisplay();
    this.overwriteCurrentNumString = true;
  }

  handleRaiseEuler() {
    this.handleEuler();
    this.handleOperators("^");
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

  determineAndStorePreviousOperator() {
    const operatorToStore = this.determineStoredOperator();
    if (this.isValidNumString()) {
      this.storeCurrentNumStringAndOperator(operatorToStore);
    } else {
      this.storeOperatorOnly(operatorToStore);
    }
    this.currentEquationStringModified = true;
  }

  storeCurrentNumStringAndOperator(operatorToStore) {
    this.ensureCurrentNumStringHasOperator();
    this.currentNumString += operatorToStore;
    this.equationStack[this.equationStack.length - 1] += this.currentNumString;
  }

  storeOperatorOnly(operatorToStore) {
    this.equationStack[this.equationStack.length - 1] += operatorToStore;
  }

  retrieveAndRemoveLastOperator() {
    const lastNumStringInStack = this.grabLastStringInStack();
    const lastOperator = lastNumStringInStack[lastNumStringInStack.length - 1];
    this.equationStack[this.equationStack.length - 1] = this.cutFromNumString(
      lastNumStringInStack,
      1
    );
    return lastOperator;
  }

  //////  Call Back Functions for Parentheses  //////

  handleOpenParenthesis() {
    this.determineAndStorePreviousOperator();
    this.equationStack.push("+0");
    this.currentNumString = "";
    this.currentEquationStringModified = false;
    return true;
  }

  handleCloseParenthesis() {
    if (this.equationStack.length === 1) {
      return false;
    }

    if (!this.isValidNumString()) {
      this.validateCurrentNumString();
    }
    this.ensureCurrentNumStringHasOperator();

    // now solve what's in the parenthesis that we are closing
    // to do that, reduceEquationString with what we have for currentNumString, currentOperator, equationStack[lastIndex], and use '=' as nextOperator.
    this.reduceEquationString("="); // this will update the display to whatever the solution of the parenthesis math was
    const newParenthesisSolution = this.equationStack.pop(); // We're now going to set this.currentNumString to whatever equationString was just reduced so we don't want that equationString in equationStack anymore
    const operatorBeforeParenthesisSolution =
      this.retrieveAndRemoveLastOperator();
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
    this.ensureCurrentNumStringHasOperator();
    if (!this.isValidNumString()) {
      this.validateCurrentNumString();
    }
    this.reduceEquationString("=");
    this.currentNumString = this.equationStack[0];
    this.equationStack[0] = "+0";
    this.switchToClear(); // in case clear button says A/C because there's now nothing to clear
    this.currentEquationStringModified = false;
    this.overwriteCurrentNumString = true;
  }

  solveTrig(angleTheta, trigOperator) {
    let trigSolution;
    if (TAN_OPERATORS.includes(trigOperator)) {
      trigSolution = math.tan(angleTheta);
    } else if (SIN_OPERATORS.includes(trigOperator)) {
      trigSolution = math.sin(angleTheta);
    } else if (COS_OPERATORS.includes(trigOperator)) {
      trigSolution = math.cos(angleTheta);
    }
    return trigSolution;
  }

  //////  Calculator Functionality //////

  reduceEquationString(nextOperator) {
    if (TRIG_OPERATORS.includes(this.grabOperatorOfCurrentNumString())) {
      const trigSolution = this.solveTrig(
        this.numStringAsNumber(),
        this.grabOperatorOfCurrentNumString()
      );
      this.currentNumString =
        this.retrieveAndRemoveLastOperator() + trigSolution.toString();
    }
    let currentOperator = this.grabOperatorOfCurrentNumString();
    let equationString = this.grabLastStringInStack();
    this.currentEquationStringModified = true;
    while (
      equationString.length !== 0 &&
      !this.isHigherOrder(currentOperator, nextOperator)
    ) {
      const lastNumString = this.grabLastNum(equationString); // this will be an operator and number, i.e. '+0'
      const lastOperator = lastNumString[0];
      equationString = this.cutFromNumString(
        equationString,
        lastNumString.length
      );
      this.equationStack[this.equationStack.length - 1] = equationString; // cut out the last num from the equation string inside this.equationStack since we're dealing with it below
      const num1 = this.numStringAsNumber(lastNumString);
      const num2 = this.numStringAsNumber(); // no arg defaults to this.currentNumString
      const solution = this.calculate(num1, currentOperator, num2);
      this.currentNumString = `${lastOperator}${solution.toString()}`;
      currentOperator = lastOperator;
    } // if we can't solve it yet, or if the last string in the stack is empty, concatenate currentNumString to the end of the last string in equationStack
    this.ensureCurrentNumStringHasOperator();
    this.equationStack[this.equationStack.length - 1] += this.currentNumString;
    this.updateNumToDisplay();
  }

  calculate(num1, currentOperator, num2) {
    let answer;
    if (ADDITION.includes(currentOperator)) {
      answer = math.chain(num1).add(num2).done();
    } else if (SUBTRACTION.includes(currentOperator)) {
      answer = math.chain(num1).subtract(num2).done();
    } else if (MULTIPLIERS.includes(currentOperator)) {
      answer = math.chain(num1).multiply(num2).done();
    } else if (DIVISION.includes(currentOperator)) {
      answer = math.chain(num1).divide(num2).done();
    } else if (EXPONENTS.includes(currentOperator)) {
      answer = math.pow(num1, num2);
    }
    return answer;
  }

  clearCurrentNumString() {
    if (this.isValidNumString() && this.currentEquationStringModified) {
      this.currentNumString = this.grabOperatorOfCurrentNumString();
    } else {
      this.currentNumString = "";
    }
    this.determineClearLogic();
    this.updateNumToDisplay("0");
  }

  determineClearLogic() {
    if (this.equationStack[0] !== "+0" || this.equationStack.length > 1) {
      this.switchToAllClear();
    }
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
    this.updateNumToDisplay();
    this.switchToClear();
    this.currentEquationStringModified = false; // so if new parenthesis are opened immediately after this button is pressed, their value is added to zero not multiplied by it. i.e. (3 + 4) (5 - 2) === +0+7 *3 not +0*7 *3
  }

  determineCorrectNumStringToUpdate() {
    if (this.isValidNumString()) {
      return this.currentNumString;
    } else if (
      !this.isValidNumString() &&
      this.equationStack.length === 1 &&
      this.equationStack[0] === "+0"
    ) {
      return "+0";
    } else {
      const lastNumFromStack = this.grabLastNum(this.grabLastStringInStack());
      this.removeLastNumFromStack(lastNumFromStack);
      return lastNumFromStack;
    }
  }

  removeLastNumFromStack(lastNumStringFromStack) {
    this.equationStack[this.equationStack.length - 1] = this.cutFromNumString(
      this.grabLastStringInStack(),
      lastNumStringFromStack.length
    );
    if (this.grabLastStringInStack() === "") {
      this.equationStack[this.equationStack.length - 1] = "+0";
    }
  }

  updateNumStringInPlace(operationToPerform) {
    this.currentNumString = this.determineCorrectNumStringToUpdate();
    const operator = this.grabOperatorOfCurrentNumString();
    const num = this.numStringAsNumber();
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
    const operator = this.grabOperatorOfCurrentNumString();
    if (HIGHER_ORDER_OPERATIONS.includes(operator)) {
      this.currentNumString = `${operator}1`;
    } else {
      this.currentNumString = `${operator}0`;
    }
  }

  grabOperatorOfCurrentNumString() {
    this.ensureCurrentNumStringHasOperator();
    return this.currentNumString[0];
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
      (LOWER_ORDER_OPERATIONS.includes(currentOperator) &&
        HIGHER_ORDER_OPERATIONS.includes(nextOperator)) ||
      ((LOWER_ORDER_OPERATIONS.includes(currentOperator) ||
        HIGHER_ORDER_OPERATIONS.includes(currentOperator)) &&
        HIGHEST_ORDER_OPERATIONS.includes(nextOperator))
    );
  }

  determineStoredOperator() {
    let storedOperator;
    if (
      this.currentNumString.length === 0 &&
      !this.currentEquationStringModified
    ) {
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

  numStringAsNumber(numString = null) {
    if (!numString) {
      numString = this.currentNumString;
    }
    return Number(numString.slice(1));
  }
}

export default Calculator;
