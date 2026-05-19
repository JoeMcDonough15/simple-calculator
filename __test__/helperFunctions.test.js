import Calculator from "../src/calculator";

describe("Distinguish between digits and operators", () => {
  const calculator = new Calculator();
  test("Distinguish when checking for digits", () => {
    expect(calculator.isDigit("6")).toBeTruthy();
    expect(calculator.isDigit("*")).toBeFalsy();
  });

  test("Distinguish when checking for operators", () => {
    expect(calculator.isOperator("-")).toBeTruthy();
    expect(calculator.isOperator("5")).toBeFalsy();
  });
});

describe("Valid number string tests", () => {
  test("Ensure that a number string is invalid at instantiation without argument", () => {
    const calculator = new Calculator();
    // calculator.currentNumString is empty (falsy) at instantiation time by default
    expect(calculator.isValidNumString()).toBeFalsy();
  });

  test("Ensure that a number string is valid when valid digit is passed in as argument", () => {
    // calculator is given a value at instantiation
    const calculator = new Calculator("5");
    expect(calculator.isValidNumString()).toBeTruthy();
  });

  test("Numbers with operators in front are valid number strings", () => {
    const calculator = new Calculator("+5");
    expect(calculator.isValidNumString()).toBeTruthy();
  });

  test("Operators without digits are invalid number strings", () => {
    const calculator = new Calculator("+");
    expect(calculator.isValidNumString()).toBeFalsy();
  });

  test("Negative numbers are valid number strings", () => {
    const calculator = new Calculator("-23");
    expect(calculator.isValidNumString()).toBeTruthy();
  });

  test("Negative numbers with operators in front of them are valid number strings.", () => {
    const calculator = new Calculator("*-5");
    expect(calculator.isValidNumString()).toBeTruthy();
  });
});
