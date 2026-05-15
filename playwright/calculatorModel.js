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

  // async instance method that iterates over test string and clicks appropriate buttons to perform test
  performCalculation = async (mathStr) => {
    // using a while loop so I can use await inside the loop and so that I can increment the loop index dynamically
    let i = 0;
    while (i < mathStr.length) {
      let nextButton;
      const currentChar = mathStr[i];
      const nextChar = mathStr[i + 1];
      // * handle special characters that are outside the CHAR_MAP, i.e. x^2, x^3, x^n sin, cos, tan, or +/-

      // * figure out which character we are dealing with so we know which button to click
      // * adjust i accordingly: increment by 1 if it's a custom exponent, by 2 if it's squared/cubed, and by 3 if it's sin, cos, tan, or +/-

      // * handle exponents here
      if (currentChar === "^") {
        if (
          // if the next character is a 2 or 3 and the character that follows that next character is not a digit
          (nextChar === "2" || nextChar === "3") &&
          !DIGITS.includes(mathStr[i + 2])
        ) {
          // that means we are either squaring or cubing
          nextChar === "2"
            ? (nextButton = "numSquared")
            : (nextButton = "numCubed");

          // click the next button that we have now assigned
          await this[nextButton].click();

          // and then increment i by 2 since ^2 or ^3 are both two character long strings
          i += 2;
          // finally, continue to next iteration so we do not click the button a second time or increment i again
          continue;
        } else {
          // if the current character is ^ and the above statement is not true, then that means it is a custom exponent and we should just assign the custom exponent button to nextButton
          // do not continue in this case, as we will click the correct button and increment i by 1 at the bottom of the loop
          nextButton = "customExponent";
        }
      }

      // * handle trig and +/- buttons here; in all of these cases, we would increment i by 3 and continue
      if (
        currentChar === "s" ||
        currentChar === "c" ||
        currentChar === "t" ||
        (currentChar === "+" && nextChar === "/")
      ) {
        // use ternary logic to determine the nextButton
        currentChar === "+"
          ? (nextButton = "toggleNegative")
          : currentChar === "s"
            ? (nextButton = "sin")
            : currentChar === "c"
              ? (nextButton = "cos")
              : (nextButton = "tan");
        // click the button
        await this[nextButton].click();
        // increment by 3 since sin, cos, tan, and +/- are all 3 characters long
        i += 3;
        // continue to next iteration so we do not click again or increment i again at bottom of loop
        continue;
      }

      // * check CHAR_MAP to get the correct key name
      // * match that correct key name against the keys that belong to this object

      // * invoke the async .click() method on the correct selector
      await this[nextButton].click();
      // * increment i by 1
      i++;
    }
  };

  // async instance method that uses the display window selector and returns a promise that resolves to that value displayed
  // in the window
  checkDisplay = async () => {};
}

export default CalculatorModel;
