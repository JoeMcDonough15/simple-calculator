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

test("Solve factorial on a number", () => {
  expect(calculator.handleFactorial(3)).toEqual(6);
});

test("Solve factorial on a negative number", () => {
  expect(calculator.handleFactorial(-3)).toEqual(NaN);
});
