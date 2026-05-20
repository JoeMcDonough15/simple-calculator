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

// TODO grabLastNum

// TODO grabLastStringInStack

// TODO previousOperatorAlreadyStored
