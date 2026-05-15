const CHAR_MAP = {
  0: "num_0",
  1: "num_1",
  2: "num_2",
  3: "num_3",
  4: "num_4",
  5: "num_5",
  6: "num_6",
  7: "num_7",
  8: "num_8",
  9: "num_9",
  "+": "operator_plus", // write logic for if we are actually hitting the +/- button instead of the + button
  "-": "minus",
  "*": "times",
  "÷": "divide",
  "=": "equals",
  "%": "percent",
  ".": "decimal",
  "(": "openParenthesis",
  ")": "closeParenthesis",
  π: "pi", // option + p
  "!": "factorial",
  "^": "exponent", // write logic to handle whether it is x^2, x^3, or x^n
  "/": "invert", // inverse fraction
  e: "euler", // write logic for if e is followed by ^
  sin: "sin", // write logic to grab the next 2 characters if you see s
  cos: "cosin", // "" or if you see c
  tan: "tangent", // "" or if you see t
};

class CalculatorModel {
  constructor(page) {
    // All possible buttons to click should be selected here using page fixture that was passed in at instantiation
    this.num_0 = page.locator("id=num_0");
    this.num_1 = page.locator("id=num_1");
    this.num_2 = page.locator("id=num_2");
    this.num_5 = page.locator("id=num_5");
    this.num_8 = page.locator("id=num_8");
    this.displayWindow = page.locator("id=display-text");
  }

  performCalculation = async () => {
    // async instance method that iterates over test string and clicks appropriate buttons to perform test
  };

  checkDisplay = async () => {
    // async instance method that uses the display window selector and returns a promise that resolves to that value displayed
    // in the window
  };
}

export default CalculatorModel;
