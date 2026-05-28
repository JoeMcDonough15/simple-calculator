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
