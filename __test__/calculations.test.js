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

test("Retrieve the last equation string from an equation stack", () => {
  calculator.equationStack = ["+3+4", "+6+2-8+-9"];
  expect(calculator.grabLastStringInStack()).toBe("+6+2-8+-9");
});
