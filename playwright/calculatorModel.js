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
  "+": "plus", // TODO write logic for if we are actually hitting the +/- button instead of the + button
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
  "/": "inverseFraction",
  e: "euler", // TODO write logic for if e is followed by ^
  // TODO write logic for x^2, x^3, or x^n since those will not be targed in the CHAR_MAP
};

class CalculatorModel {
  constructor(page) {
    // All possible buttons to click should be selected here using page fixture that was passed in at instantiation
    this.num_0 = page.locator("id=num_0");
    this.num_1 = page.locator("id=num_1");
    this.num_2 = page.locator("id=num_2");
    this.num_3 = page.locator("id=num_3");
    this.num_4 = page.locator("id=num_4");
    this.num_5 = page.locator("id=num_5");
    this.num_6 = page.locator("id=num_6");
    this.num_7 = page.locator("id=num_7");
    this.num_8 = page.locator("id=num_8");
    this.num_9 = page.locator("id=num_9");
    this.toggleNegative = page.locator("id=toggle-negative");
    this.plus = page.locator("id=add");
    this.minus = page.locator("id=subtract");
    this.times = page.locator("id=multiply");
    this.divide = page.locator("id=divide");
    this.equals = page.locator("id=equals");
    this.percent = page.locator("id=percentage-button");
    this.decimal = page.getByText(".");
    this.openParenthesis = page.locator("id=open-parenthesis");
    this.closeParenthesis = page.locator("id=close-parenthesis");
    this.pi = page.locator("id=pi-button");
    this.factorial = page.locator("id=factorial-button");
    this.numSquared = page.locator("id=square-button");
    this.numCubed = page.locator("id=cube-button");
    this.customExponent = page.locator("id=custom-exponent-button");
    this.inverseFraction = page.locator("id=inverse-fraction-button");
    this.euler = page.locator("id=euler-button");
    this.eulerRaised = page.locator("id=euler-raised-button");
    this.sin = page.locator("id=sin");
    this.cos = page.locator("id=cos");
    this.tan = page.locator("id=tan");
    this.clearButton = page.locator("id=clear-button");
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
