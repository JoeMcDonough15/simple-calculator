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
});
