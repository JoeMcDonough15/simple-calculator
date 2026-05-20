import Calculator from "../src/calculator";
import addCommasToNumString from "../src/addCommasToNumString";

let calculator;

beforeEach(() => {
  calculator = new Calculator();
});

// ! Unit Tests

describe("Distinguish between digits and operators", () => {
  test("Check for digits", () => {
    expect(calculator.isDigit("6")).toBeTruthy();
    expect(calculator.isDigit("*")).toBeFalsy();
  });

  test("Check for operators", () => {
    expect(calculator.isOperator("-")).toBeTruthy();
    expect(calculator.isOperator("5")).toBeFalsy();
  });
});

describe("Building number strings with operators", () => {
  test("Ensure that a number was given the default + operator if one was not provided", () => {
    calculator.currentNumString = "45";
    calculator.ensureCurrentNumStringHasOperator();
    expect(calculator.grabOperatorOfCurrentNumString()).toBe("+");
  });

  test("Should be able to retrieve operator from current number string", () => {
    calculator.currentNumString = "*7";
    expect(calculator.grabOperatorOfCurrentNumString()).toBe("*");
  });

  test("Should be able to change the operator of a passed in number string", () => {
    calculator.currentNumString = "*7";
    calculator.currentNumString = calculator.replaceOperator(
      calculator.currentNumString,
      "÷",
    );
    expect(calculator.grabOperatorOfCurrentNumString()).toBe("÷");
  });
});

describe("Valid number string tests", () => {
  test("Ensure that the calculator's current number string is invalid at instantiation", () => {
    expect(calculator.isValidNumString()).toBeFalsy();
  });

  test("Ensure that a number string is valid", () => {
    calculator.currentNumString = "5";
    expect(calculator.isValidNumString()).toBeTruthy();
  });

  test("Numbers with operators in front are valid number strings", () => {
    calculator.currentNumString = "+5";
    expect(calculator.isValidNumString()).toBeTruthy();
  });

  test("Operators without digits are invalid number strings", () => {
    calculator.currentNumString = "+";
    expect(calculator.isValidNumString()).toBeFalsy();
  });

  test("Negative numbers are valid number strings", () => {
    calculator.currentNumString = "-23";
    expect(calculator.isValidNumString()).toBeTruthy();
  });

  test("Negative numbers with operators in front of them are valid number strings.", () => {
    calculator.currentNumString = "*-5";
    expect(calculator.isValidNumString()).toBeTruthy();
  });

  test("Decimal values are valid number strings", () => {
    calculator.currentNumString = "0.34545";
    expect(calculator.isValidNumString()).toBeTruthy();
  });

  test("Validate a number string when empty", () => {
    calculator.currentNumString = "";
    calculator.validateCurrentNumString();
    expect(calculator.currentNumString).toBe("+0");
  });

  test("Validate a number string when it is only a multiplication or division operator", () => {
    calculator.currentNumString = "*";
    calculator.validateCurrentNumString();
    expect(calculator.currentNumString).toBe("*1"); // will not cause any math to be incorrect
    calculator.currentNumString = "÷";
    calculator.validateCurrentNumString();
    expect(calculator.currentNumString).toBe("÷1");
  });

  test("Validate a number string when it is only an addition or subtraction operator", () => {
    calculator.currentNumString = "+";
    calculator.validateCurrentNumString();
    expect(calculator.currentNumString).toBe("+0");
    calculator.currentNumString = "-";
    calculator.validateCurrentNumString();
    expect(calculator.currentNumString).toBe("-0");
  });
});

describe("Converting number strings to numbers", () => {
  test("Return a number string's number equivalent", () => {
    const numStringAsNum = calculator.numStringAsNumber("+234");
    expect(numStringAsNum).not.toBeNaN();
    expect(numStringAsNum).toEqual(234);
  });

  test("Return a negative number string's number equivalent", () => {
    const negativeStringAsNum = calculator.numStringAsNumber("*-234"); // operator and negative sign
    expect(negativeStringAsNum).not.toBeNaN();
    expect(negativeStringAsNum).toEqual(-234);
  });

  test("Should default to calculator.currentNumString if no arg passed", () => {
    calculator.currentNumString = "÷245"; // should default to calculator.currentNumString
    expect(calculator.numStringAsNumber()).not.toBeNaN();
    expect(calculator.numStringAsNumber()).toEqual(245);
  });
});

describe("Clearing number strings", () => {
  test("If current number string is valid and the equation string has been modified, preserve the operator of the cleared number", () => {
    calculator.currentNumString = "+5";
    calculator.currentEquationStringModified = true;
    calculator.clearCurrentNumString();
    expect(calculator.currentNumString).toBe("+");
  });

  test("If current number string is not a valid number string, reset it entirely when clearing", () => {
    calculator.currentNumString = "+";
    calculator.currentEquationStringModified = true;
    calculator.clearCurrentNumString();
    expect(calculator.currentNumString).toHaveLength(0);
  });

  test("If current number string is valid but the equation string has not yet been modified, do not preserve the operator of the cleared number", () => {
    calculator.currentNumString = "+5";
    calculator.currentEquationStringModified = false;
    calculator.clearCurrentNumString();
    expect(calculator.currentNumString).toHaveLength(0);
  });

  test("Should be able to switch the functionality of clear to all-clear", () => {
    calculator.switchToAllClear();
    expect(calculator.clearAll).toBeTruthy();
  });

  test("Should be able to switch the functionality of all-clear back to clear", () => {
    calculator.switchToClear();
    expect(calculator.clearAll).toBeFalsy();
  });

  test("After clearing a number string, switch to all clear if there is more in memory to clear in the current equation string", () => {
    calculator.equationStack = ["+23*"];
    calculator.determineClearLogic();
    expect(calculator.clearAll).toBeTruthy();
  });

  test("After clearing a number string, switch to all clear if there is more in memory to clear in the equation stack", () => {
    calculator.equationStack = ["+23", "+45", "+34+76"];
    calculator.determineClearLogic();
    expect(calculator.clearAll).toBeTruthy();
  });

  test("After clearing a number string, do not switch to all clear if there is nothing in memory besides +0", () => {
    calculator.determineClearLogic();
    expect(calculator.clearAll).toBeFalsy();
  });

  test("All clear logic should clear the current number string as well as anything in memory", () => {
    calculator.equationStack = ["+23", "+45", "+34+76"];
    calculator.currentNumString = "*234";
    calculator.allClear();
    expect(calculator.equationStack).toHaveLength(1);
    expect(calculator.equationStack[0]).toBe("+0");
    expect(calculator.currentNumString).toHaveLength(0);
    expect(calculator.currentEquationStringModified).toBeFalsy();
  });
});

describe("Number string helper functions", () => {
  test("Cut from the end of a number string by desired length", () => {
    let numString = "2345653";
    expect(numString.length === 7);
    numString = calculator.cutFromNumString(numString, 4);
    expect(numString.length === 3);
  });

  describe("Adding commas to a number string", () => {
    test("Add commas to a large number", () => {
      const numStringWithoutCommas = "2345334253425";
      const numStringWithCommas = addCommasToNumString(numStringWithoutCommas);
      expect(numStringWithCommas).toBe("2,345,334,253,425");
    });

    test("Do not add commas to a small number", () => {
      expect(addCommasToNumString("9")).toBe("9");
    });

    test("Add commas to negative number", () => {
      expect(addCommasToNumString("-234544")).toBe("-234,544");
    });

    test("Add commas to number with a decimal point", () => {
      expect(addCommasToNumString("23454.234")).toBe("23,454.234");
    });
  });

  describe("Should be able to concatenate to a number string or replace it if needed", () => {
    test("Numbers should concatenate to string to build multiple place values", () => {
      let numString = "+4";
      const nextChar = "2";
      numString = calculator.concatOrReplace(numString, nextChar);
      expect(numString).toBe("+42");
    });

    test("Disallow more than one decimal point when building a number string", () => {
      let numString = "+3.";
      const nextChar = ".";
      numString = calculator.concatOrReplace(numString, nextChar);
      expect(numString).toBe("+3.");
    });

    test("Zero should not be overwritten if concatenating a decimal point to 0", () => {
      let numString = "+0";
      const nextChar = ".";
      numString = calculator.concatOrReplace(numString, nextChar);
      expect(numString).toBe("+0.");
    });

    test("Zero should be inserted if number string is an operator followed by a decimal point", () => {
      let numString = "+";
      const nextChar = ".";
      numString = calculator.concatOrReplace(numString, nextChar);
      expect(numString).toBe("+0.");
    });

    test("Multiple leading zeroes should be replaced", () => {
      let numString = "+0";
      const nextChar = "5";
      numString = calculator.concatOrReplace(numString, nextChar);
      expect(numString).toBe("+5");
    });

    test("Multiple zeroes after a non zero should be concatenated, not replaced", () => {
      let numString = "+50";
      const nextChar = "0";
      numString = calculator.concatOrReplace(numString, nextChar);
      expect(numString).toBe("+500");
    });
  });
});

describe("Displaying number strings", () => {
  test("Display a valid number string", () => {
    calculator.updateNumToDisplay("5");
    expect(calculator.numToDisplay).toBe("5");
  });

  test("Display stored current number string when no number is passed in", () => {
    calculator.currentNumString = "6";
    calculator.updateNumToDisplay();
    expect(calculator.numToDisplay).toBe("6");
  });

  test("Display the last number string from the last string in the stack if no number is passed in and currentNumString is not valid", () => {
    calculator.equationStack = ["-4+7"];
    calculator.updateNumToDisplay();
    expect(calculator.numToDisplay).toBe("7");
  });

  test("Display a number string only after removing operators from the front and back of it", () => {
    calculator.updateNumToDisplay("+8*");
    expect(calculator.numToDisplay).toBe("8");
  });

  test("Display 'Error' when number string is NaN converted to string", () => {
    calculator.updateNumToDisplay(NaN.toString());
    expect(calculator.numToDisplay).toBe("Error");
  });
});

describe("Entering positive numbers", () => {
  test("Enter a 3 digit number", () => {
    calculator.handleNums("5");
    calculator.handleNums("9");
    calculator.handleNums("2");
    expect(calculator.currentNumString).toBe("+592");
  });

  test("Enter a decimal", () => {
    calculator.handleNums("0");
    calculator.handleNums(".");
    calculator.handleNums("2");
    expect(calculator.currentNumString).toBe("+0.2");
  });

  test("Enter a large number", () => {
    calculator.handleNums("9");
    calculator.handleNums("9");
    calculator.handleNums("9");
    calculator.handleNums("9");
    calculator.handleNums("9");
    calculator.handleNums("9");
    calculator.handleNums("9");
    calculator.handleNums("9");
    calculator.handleNums("9");
    expect(calculator.currentNumString).toBe("+999999999");
  });

  test.only("Overwrite current number string when necessary but preserve its operator", () => {
    calculator.currentNumString = "÷6";
    calculator.overwriteCurrentNumString = true;
    calculator.handleNums("8");
    expect(calculator.currentNumString).toBe("÷8");
  });
});
