import Calculator from "../src/calculator";

let calculator;

beforeEach(() => {
  calculator = new Calculator();
});

describe("Ensure calculator has all necessary properties and methods when instantiated", () => {
  test("Calculator should have necessary properties when instantiated, initialized to the correct values", () => {
    expect(calculator).toHaveProperty("equationStack", ["+0"]);
    expect(calculator).toHaveProperty("currentNumString", "");
    expect(calculator).toHaveProperty("numToDisplay", "");
    expect(calculator).toHaveProperty("currentEquationStringModified", false);
    expect(calculator).toHaveProperty("overwriteCurrentNumString", false);
    expect(calculator).toHaveProperty("clearAll", false);
  });

  test("Calculator should have necessary methods when instantiated", () => {
    // numberStrings.test.js
    expect(calculator).toHaveProperty("isDigit");
    expect(calculator).toHaveProperty("isOperator");
    expect(calculator).toHaveProperty("isValidNumString");
    expect(calculator).toHaveProperty("ensureCurrentNumStringHasOperator");
    expect(calculator).toHaveProperty("validateCurrentNumString");
    expect(calculator).toHaveProperty("grabOperatorOfCurrentNumString");
    expect(calculator).toHaveProperty("cutFromNumString");
    expect(calculator).toHaveProperty("determineStoredOperator");
    expect(calculator).toHaveProperty("replaceOperator");
    expect(calculator).toHaveProperty("numStringAsNumber");
    expect(calculator).toHaveProperty("concatOrReplace");
    expect(calculator).toHaveProperty("clearCurrentNumString");
    expect(calculator).toHaveProperty("switchToAllClear");
    expect(calculator).toHaveProperty("switchToClear");
    expect(calculator).toHaveProperty("allClear");
    expect(calculator).toHaveProperty("determineClearLogic");
    expect(calculator).toHaveProperty("handleNums");
    expect(calculator).toHaveProperty("updateNumToDisplay");

    // calculations.test.js
    expect(calculator).toHaveProperty("checkForInfinity");
    expect(calculator).toHaveProperty("grabLastNum");
    expect(calculator).toHaveProperty("grabLastStringInStack");
    expect(calculator).toHaveProperty("previousOperatorAlreadyStored");
    expect(calculator).toHaveProperty("removeLastNumFromStack");
    expect(calculator).toHaveProperty("determineStoredOperator");

    // *                                                     * //

    expect(calculator).toHaveProperty("handleOperators");
    expect(calculator).toHaveProperty("calculate");
    expect(calculator).toHaveProperty("handleEquals");
    expect(calculator).toHaveProperty("reduceEquationString");

    // Order of operations
    expect(calculator).toHaveProperty("isHigherOrder");

    expect(calculator).toHaveProperty("determineAndStorePreviousOperator");
    expect(calculator).toHaveProperty("storeCurrentNumStringAndOperator");
    expect(calculator).toHaveProperty("storeOperatorOnly");
    expect(calculator).toHaveProperty("retrieveAndRemoveLastOperator");
    expect(calculator).toHaveProperty("handleOpenParenthesis");
    expect(calculator).toHaveProperty("handleCloseParenthesis");
    expect(calculator).toHaveProperty("solveTrig");

    // Updating numStrings in place
    expect(calculator).toHaveProperty("determineCorrectNumStringToUpdate");
    expect(calculator).toHaveProperty("handlePercentage");
    expect(calculator).toHaveProperty("handlePi");
    expect(calculator).toHaveProperty("handleEuler");
    expect(calculator).toHaveProperty("handleRaiseEuler");
    expect(calculator).toHaveProperty("handleSquared");
    expect(calculator).toHaveProperty("handleCubed");
    expect(calculator).toHaveProperty("handleFactorial");
    expect(calculator).toHaveProperty("handleInverseFraction");
    expect(calculator).toHaveProperty("makePosOrNeg");
    expect(calculator).toHaveProperty("performOperationOnNumString");
    expect(calculator).toHaveProperty("updateNumStringInPlace");
  });
});
