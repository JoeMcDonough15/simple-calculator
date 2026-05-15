const DIGITS = "0123456789";
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
  "+": "plus", // logic handles if we are actually hitting the +/- button instead of the + button
  "-": "minus",
  "*": "times",
  "÷": "divide",
  "=": "equals",
  "%": "percent",
  ".": "decimal",
  "(": "openParenthesis",
  ")": "closeParenthesis",
  "^": "customExponent", // logic handles x^2, x^3, and e^ edge cases
  π: "pi", // option + p
  "!": "factorial",
  "/": "inverseFraction",
  e: "euler",
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
    this.decimal = page.locator("id=decimal-point");
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
    this.displayWindow = page.locator("id=display-text");
  }

  // async instance method that iterates over test string and clicks appropriate buttons to perform test
  performCalculation = async (mathStr) => {
    // using a while loop so I can use await inside the loop and so that I can increment the loop index dynamically
    let i = 0;
    while (i < mathStr.length) {
      let nextButton;
      const currentChar = mathStr[i];
      const nextChar = mathStr[i + 1]; // we will need this for x^2, x^3, e^n, and +/- cases

      // * figure out which character we are dealing with so we know which button to click

      // * handle trig and +/- buttons here; in all of these cases, we would increment i by 3
      if (
        currentChar === "s" ||
        currentChar === "c" ||
        currentChar === "t" ||
        (currentChar === "+" && nextChar === "/")
      ) {
        // * 1) use ternary logic to determine the nextButton
        currentChar === "+"
          ? (nextButton = "toggleNegative")
          : currentChar === "s"
            ? (nextButton = "sin")
            : currentChar === "c"
              ? (nextButton = "cos")
              : (nextButton = "tan");
        // * 2) increment i by 3 since sin, cos, tan, and +/- are all 3 characters long
        i += 3;
      }

      // * handle x^2, x^3, and e^n here
      else if (
        // if the current character is ^, the next character is a 2 or 3, and the character that follows that next character is not a digit
        (currentChar === "^" &&
          (nextChar === "2" || nextChar === "3") &&
          !DIGITS.includes(mathStr[i + 2])) || // or if the current character is e and the next character is ^
        (currentChar === "e" && nextChar === "^")
      ) {
        // * 1) that means we are either squaring, cubing, or raising e^n so assign nextButton to the correct name using ternary logic
        nextChar === "2"
          ? (nextButton = "numSquared")
          : nextChar === "3"
            ? (nextButton = "numCubed")
            : (nextButton = "eulerRaised");
        // * 2) and then increment i by 2 since ^2, ^3, and e^ are all two character long strings
        i += 2;
      } else {
        //  handle all other buttons in the else block, using the CHAR_MAP
        // * 1) check CHAR_MAP to get the correct key name
        nextButton = CHAR_MAP[currentChar];
        // * 2) increment i by 1
        i++;
      }

      // * click the appropriate button no matter which one was selected above
      await this[nextButton].click();
    }
  };
}

export default CalculatorModel;
