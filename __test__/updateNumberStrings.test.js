import Calculator from "../src/calculator";

let calculator;

beforeEach(() => {
  calculator = new Calculator();
});

test("Enter pi", () => {
  calculator.handlePi();
  expect(calculator.currentNumString).toBe("+3.141592653589793");
});

test("Enter Euler's number", () => {
  calculator.handleEuler();
  expect(calculator.currentNumString).toBe("+2.718281828459045");
});

describe("Squaring and cubing with built in functionality", () => {
  test("Square a positive number", () => {
    expect(calculator.handleSquared(2)).toEqual(4);
  });

  test("Square a negative number", () => {
    expect(calculator.handleSquared(-6)).toEqual(36);
  });

  test("Cube a positive number", () => {
    expect(calculator.handleCubed(2)).toEqual(8);
  });

  test("Cube a negative number", () => {
    expect(calculator.handleCubed(-2)).toEqual(-8);
  });
});

describe("Factorials", () => {
  test("Solve factorial on a number", () => {
    expect(calculator.handleFactorial(3)).toEqual(6);
  });

  test("Solve factorial on a negative number", () => {
    expect(calculator.handleFactorial(-3)).toEqual(NaN);
  });
});

describe("Making numbers positive and negative", () => {
  test("Convert a positive number to negative", () => {
    expect(calculator.makePosOrNeg(5)).toEqual(-5);
  });
  test("Convert a negative number to positive", () => {
    expect(calculator.makePosOrNeg(-39)).toEqual(39);
  });
  test("Ignore 0 when trying to convert to negative", () => {
    expect(calculator.makePosOrNeg(0)).toEqual(0);
  });
});
