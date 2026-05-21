import Calculator from "../src/calculator";

let calculator;

beforeEach(() => {
  calculator = new Calculator();
});

describe("Check to see if Infinity is at the end of an equation string", () => {
  test("Detect and return Infinity with its operator", () => {
    const result = calculator.checkForInfinity("+8*3+Infinity");
    expect(result).toBe("+Infinity");
  });

  test("Detect and return -Infinity with its operator", () => {
    const result = calculator.checkForInfinity("+8*3+-Infinity");
    expect(result).toBe("+-Infinity");
  });

  test("Detect no Infinity and return empty string", () => {
    const result = calculator.checkForInfinity("+8*3");
    expect(result).toBe("");
  });
});

describe("Grab last number and its operator from an equation string", () => {
  test("Retrieve the last number from the equation string ", () => {
    const equationString = "*8+3";
    const lastNum = calculator.grabLastNum(equationString);
    expect(lastNum).toBe("+3");
  });

  test("Retrieve the last number from the equation string when it is expressed in exponential notation", () => {
    const equationString = "+6÷3+9e+1234";
    const lastNum = calculator.grabLastNum(equationString);
    expect(lastNum).toBe("+9e+1234");
  });

  test("Retrieve the last number from the equation string when it is a negative number", () => {
    const equationString = "+7*-5";
    const lastNum = calculator.grabLastNum(equationString);
    expect(lastNum).toBe("*-5");
  });
});

describe("Remove the last number from the last string in an equation stack", () => {
  test("Remove the last number leaving other numbers in tact", () => {
    calculator.equationStack = ["+3+8", "+5÷7"];
    calculator.removeLastNumFromStack();
    expect(calculator.equationStack).toEqual(["+3+8", "+5"]);
  });

  test("Remove the last number leaving and if other numbers remain, fill with default value", () => {
    calculator.equationStack = ["+3+8", "+5"];
    calculator.removeLastNumFromStack();
    expect(calculator.equationStack).toEqual(["+3+8", "+0"]);
  });
});

describe("Storing and retrieving operators", () => {
  describe("Should be able to determine which operator to store", () => {
    test("If the current number string is empty and the current equation string has not been modified, the stored operator should be a + so if parenthesis are opened their total is added to 0, not multiplied by 0", () => {
      const storedOperator = calculator.determineStoredOperator();
      expect(storedOperator).toBe("+");
    });

    test("If the current number string consists of only an operator, that operator should be stored", () => {
      calculator.currentNumString = "÷";
      const storedOperator = calculator.determineStoredOperator();
      expect(storedOperator).toBe("÷");
    });

    test("If the current equation string has been modified, the stored operator should default to multiplication", () => {
      // (a + b) (c + d) ==> total inside the first set of parenthesis should be multiplied by total inside the second set
      calculator.currentEquationStringModified = true;
      const storedOperator = calculator.determineStoredOperator();
      expect(storedOperator).toBe("*");
    });

    test("If current number string is valid, stored operator should default to multiplication", () => {
      // 5 (a + b) ==> 5 should be multiplied by total inside set of parenthesis
      calculator.currentNumString = "+5";
      const storedOperator = calculator.determineStoredOperator();
      expect(storedOperator).toBe("*");
    });
  });

  test("Should be able to concatenate an operator to the end of the current number string and store that new string", () => {
    calculator.equationStack = ["+5", "+3"];
    calculator.currentNumString = "+6";
    calculator.storeCurrentNumStringAndOperator("*");
    expect(calculator.currentNumString).toBe("+6*");
    expect(calculator.equationStack[calculator.equationStack.length - 1]).toBe(
      "+3+6*",
    );
  });

  test("Should be able to store only an operator to the last equation string in an equation stack", () => {
    calculator.equationStack = ["+8", "-5"];
    calculator.storeOperatorOnly("*");
    expect(calculator.equationStack[calculator.equationStack.length - 1]).toBe(
      "-5*",
    );
  });

  describe("Should be able to determine and store an operator in one function call", () => {
    test("Store current number string along with determined operator to last equation string in an equation stack", () => {
      calculator.equationStack = ["+5", "+3"];
      calculator.currentNumString = "+6";
      calculator.determineAndStorePreviousOperator();
      expect(calculator.currentNumString).toBe("+6*");
      expect(
        calculator.equationStack[calculator.equationStack.length - 1],
      ).toBe("+3+6*");
    });

    test("Store only the determined operator to last equation string in an equation stack", () => {
      calculator.equationStack = ["+8", "-5"];
      calculator.currentEquationStringModified = true;
      calculator.currentNumString = "÷";
      calculator.determineAndStorePreviousOperator();
      expect(
        calculator.equationStack[calculator.equationStack.length - 1],
      ).toBe("-5÷");
    });

    test("Store a + when the current equation string has been modified and current number string is empty", () => {
      calculator.determineAndStorePreviousOperator();
      expect(
        calculator.equationStack[calculator.equationStack.length - 1],
      ).toBe("+0+");
    });

    test("Store an * when the current equation string has been modified and the current number string is empty", () => {
      calculator.equationStack = ["+8"];
      calculator.currentEquationStringModified = true;
      calculator.determineAndStorePreviousOperator();
      expect(
        calculator.equationStack[calculator.equationStack.length - 1],
      ).toBe("+8*");
    });
  });

  describe("Determine whether the last character at the end of the last equation string is a stored operator", () => {
    test("Return true if an operator has been stored", () => {
      calculator.equationStack = ["+6-8", "+2*"];
      expect(calculator.previousOperatorAlreadyStored()).toBeTruthy();
    });

    test("Return false if an operator has not been stored", () => {
      calculator.equationStack = ["+6-8", "+2*2"];
      expect(calculator.previousOperatorAlreadyStored()).toBeFalsy();
    });
  });

  test("Should be able to retrieve and remove the last stored operator", () => {
    calculator.equationStack = ["+9*"];
    const retrievedOperator = calculator.retrieveAndRemoveLastOperator();
    expect(retrievedOperator).toBe("*");
    expect(calculator.equationStack).toEqual(["+9"]);
  });
});

describe("Tests for handling operators", () => {
  test("Should disallow the current number string from being overwritten", () => {
    calculator.overwriteCurrentNumString = true;
    calculator.handleOperators("+");
    expect(calculator.overwriteCurrentNumString).toBeFalsy();
  });

  test("Should store last operator if a trig operator follows", () => {
    calculator.equationStack = ["+4"];
    calculator.handleOperators("*");
    calculator.handleOperators("t");
    expect(calculator.equationStack).toEqual(["+4*"]);
  });

  test("Should return if a non trig operator follows a trig operator", () => {
    calculator.equationStack = ["+4"];
    calculator.handleOperators("*");
    calculator.handleOperators("t"); // will store the multiplication sign
    calculator.handleOperators("÷"); // should return without doing anything
    expect(calculator.equationStack).toEqual(["+4*"]);
  });

  test("Should replace a trig operator with another trig operator if entered in succession", () => {
    calculator.handleOperators("t");
    calculator.handleOperators("c"); // should replace tan
    calculator.handleNums("9");
    calculator.handleNums("0");
    calculator.handleOperators("+");
    expect(calculator.numToDisplay).toBe("6.123233995736766e-17"); // cos of 90 degrees; ignore tan; this answer would be rounded down to zero in index.js fixDecimals()
  });
});

test("Retrieve the last equation string from an equation stack", () => {
  calculator.equationStack = ["+3+4", "+6+2-8+-9"];
  expect(calculator.grabLastStringInStack()).toBe("+6+2-8+-9");
});

describe("Should be able to solve trigonometry problems", () => {
  test("Should be able to return the tangent of an angle", () => {
    const solution = calculator.solveTrig(45, "t");
    expect(solution).toEqual(0.9999999999999999); // will be rounded to 1 in fixDecimals()
  });

  test("Should return Infinity if solving tangent on a 90 degree angle", () => {
    const solution = calculator.solveTrig(90, "T"); // capital T and lowercase t are valid
    expect(solution).toEqual(Infinity);
  });

  test("Should return Infinity if solving tangent on a 270 degree angle", () => {
    const solution = calculator.solveTrig(270, "T");
    expect(solution).toEqual(Infinity);
  });

  test("Should be able to return the cosine of an angle", () => {
    const solution = calculator.solveTrig(90, "c");
    expect(solution).toEqual(6.123233995736766e-17); // will be rounded to 0 in fixDecimals()
  });

  test("Should be able to return the sine of an angle", () => {
    const solution = calculator.solveTrig(45, "s");
    expect(solution).toEqual(0.7071067811865475);
  });

  test("Should be able to perform trigonometry on negative angles", () => {
    const solution = calculator.solveTrig(-45, "s");
    expect(solution).toEqual(-0.7071067811865475);
  });
});

describe("Should be able to determine if the next operator (second arg) is of higher order of operation than the current operator (first arg)", () => {
  test("Should consider multiplication to be of higher order than addition", () => {
    expect(calculator.isHigherOrder("+", "*")).toBeTruthy();
  });
  test("Should consider subtraction to not be of higher order than division", () => {
    expect(calculator.isHigherOrder("÷", "-")).toBeFalsy();
  });
  test("Should consider exponent to be of higher order than multiplication", () => {
    expect(calculator.isHigherOrder("*", "^")).toBeTruthy();
  });
  test("Should consider exponent to be of higher order than subtraction", () => {
    expect(calculator.isHigherOrder("-", "^")).toBeTruthy();
  });
  test("Should consider division to not be of higher order than exponent", () => {
    expect(calculator.isHigherOrder("^", "÷")).toBeFalsy();
  });
});

describe.only("Should be able to handle parenthetical math", () => {
  test("Should be able to open parenthesis and see a new equation string added to the equationStack and + stored to previous equation string", () => {
    calculator.handleOpenParenthesis();
    expect(calculator.equationStack).toHaveLength(2);
    expect(calculator.equationStack).toEqual(["+0+", "+0"]);
  });

  test("Should be able to maintain math from previous equation string and store correct operator before pushing new equation string to equation stack", () => {
    calculator.equationStack = ["+8"];
    calculator.currentEquationStringModified = true;
    calculator.handleOpenParenthesis();
    expect(calculator.equationStack).toHaveLength(2);
    expect(calculator.equationStack).toEqual(["+8*", "+0"]);
    expect(calculator.currentEquationStringModified).toBeFalsy(); // should reset to false when new set opens
  });

  test("Should be able to nest parenthesis, adding a new equation string to equation stack each time a new set opens", () => {
    for (let i = 0; i < 5; i++) {
      calculator.handleOpenParenthesis();
    }
    expect(calculator.equationStack).toHaveLength(6);
  });

  test("Should prohibit closing parenthesis if no set is open", () => {
    const closeParenthesis = calculator.handleCloseParenthesis();
    expect(closeParenthesis).toBeFalsy();
  });

  test("Should validate an empty current number string when closing parenthesis by converting it to +0 before solving parenthesis", () => {
    calculator.equationStack = ["+8*", "+6-4"];
    calculator.currentNumString = "";
    calculator.handleCloseParenthesis();
    expect(calculator.currentNumString).toBe("*2"); // the solution to the +6-4 concatenated after * from the previous equation string
  });

  test("Should validate a current number string consisting of an operator of higher order of operation when closing parenthesis by concatenating a 1", () => {
    calculator.currentNumString = "÷"; // will convert to ÷1 so math is not affected by invalid number string
    calculator.equationStack = ["+8*", "+6-4"];
    calculator.handleCloseParenthesis();
    expect(calculator.currentNumString).toBe("*2"); // the solution to the +6-4 concatenated after * from the previous equation string
  });

  test("Should remove the last equation string from the equation stack and last operator from previous equatoin string on successful parenthesis closure", () => {
    calculator.equationStack = ["+8*", "+6-4"];
    calculator.handleCloseParenthesis();
    expect(calculator.equationStack).toHaveLength(1);
  });

  test("Should place correct stored operator in front of solved parenthetical math", () => {
    calculator.equationStack = ["+8*", "+6-4"];
    calculator.handleCloseParenthesis();
    expect(calculator.currentNumString).toEqual("*2");
  });

  test("Should wait to aggregate parenthetical math with previous equation string until receiving next operator input", () => {
    calculator.equationStack = ["+8*", "+6-4"];
    calculator.handleCloseParenthesis();
    expect(calculator.equationStack).toEqual(["+8"]);
    expect(calculator.currentNumString).toEqual("*2");
  });
  // *  * //
});
