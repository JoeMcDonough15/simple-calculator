import Calculator from "../src/calculator";

describe("Distinguish between digits and operators", () => {
  const calculator = new Calculator();
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
  const calculator = new Calculator();
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
  const calculator = new Calculator();
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
  const calculator = new Calculator();
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

describe("Number string helper functions", () => {
  const calculator = new Calculator();
  test("Cut from the end of a number string by desired length", () => {
    let numString = "2345653";
    expect(numString.length === 7);
    numString = calculator.cutFromNumString(numString, 4);
    expect(numString.length === 3);
  });
});
