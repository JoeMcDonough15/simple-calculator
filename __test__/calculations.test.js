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

test("Retrieve the last equation string from an equation stack", () => {
  calculator.equationStack = ["+3+4", "+6+2-8+-9"];
  expect(calculator.grabLastStringInStack()).toBe("+6+2-8+-9");
});

// TODO previousOperatorAlreadyStored
