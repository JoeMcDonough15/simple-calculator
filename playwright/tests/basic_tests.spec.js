import { test, expect, chromium } from "@playwright/test";
import CalculatorModel from "../calculatorModel";

let page;

test.beforeEach(async () => {
  // await page.goto("http://localhost:3000");
  const browser = await chromium.launch({
    headless: false,
    slowMo: 2000, // slow down by 3 seconds
  });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("http://localhost:3000");
});

test.afterEach(async ({ page }) => {
  await page.close();
});

// ? Entering Numbers Test Block
test.describe("Calculator should be able to accept numbers as input and reflect them accurately in display window", () => {
  // * 5 should be able to be entered
  test("Enter a one digit number", async () => {
    // * 1) instantiate our object
    const calculator = new CalculatorModel(page);
    // * 2) Press 5
    await calculator.performCalculation("5");
    // await page.locator("id=num_5").click();
    // await expect(page.locator("id=display-text")).toHaveText("5");

    // * 3) Assert that the display shows 5
    expect(calculator.displayWindow).toHaveText("5");
  });

  // * 28 should be able to be entered
  test("Enter a two digit number", async () => {
    const calculator = new CalculatorModel(page);
    // Press 2
    await calculator.performCalculation("28=");
    // await page.locator("id=num_5").click();
    // // Press 8
    // await page.locator("id=num_5").click();
    // Assert that the display shows 28
    // await expect(page.locator("id=display-text")).toHaveText("28");
    expect(calculator.displayWindow).toHaveText("28");
  });

  // * 294,345 should be able to be entered with comma in the correct place
  test("Enter a 6 digit number and verify that the comma is added and in the right place", async () => {
    const calculator = new CalculatorModel(page);
    await calculator.performCalculation("294345");
    expect(calculator.displayWindow).toHaveText("294,345");
    // Press 2
    // await page.locator("id=num_2").click();
    // // Press 9
    // await page.locator("id=num_9").click();
    // // Press 4
    // await page.locator("id=num_4").click();
    // // Press 3
    // await page.locator("id=num_3").click();
    // // Press 4
    // await page.locator("id=num_4").click();
    // // Press 5
    // await page.locator("id=num_5").click();
    // // Assert that the display shows 294,345
    // await expect(page.locator("id=display-text")).toHaveText("294,345");
  });

  // * 75.39 should be able to be entered with decimal in the correct place
  test("Enter a decimal and verify the decimal point is in the correct place", async () => {
    const calculator = new CalculatorModel(page);
    await calculator.performCalculation("75.39");
    expect(calculator.displayWindow).toHaveText("75.39");
    // // Press 7
    // await page.locator("id=num_7").click();
    // // Press 5
    // await page.locator("id=num_5").click();
    // // Press .
    // await page.getByText(".").click();
    // // Press 3
    // await page.locator("id=num_3").click();
    // // Press 9
    // await page.locator("id=num_9").click();
    // // Assert that the display text shows 75.39
    // await expect(page.locator("id=display-text")).toHaveText("75.39");
  });

  // * 0..3 should resolve to just 0.3 without an extra decimal appearing
  test.only("Enter a number with multiple decimal points, and ensure there is only one", async () => {
    const calculator = new CalculatorModel(page);
    await calculator.performCalculation("0..3");
    expect(calculator.displayWindow).toHaveText("0.3");
    // // Press 0
    // await page.locator("id=num_0").click();
    // // Press . twice
    // for (const _ of new Array(2)) {
    //   await page.getByText(".").click();
    // }
    // // Press 3
    // await page.locator("id=num_3").click();
    // // Assert that the display shows 0.3
    // await expect(page.locator("#display-text")).toHaveText("0.3");
  });

  // * -35 should be able to be entered
  test.only("Enter a negative number", async () => {
    const calculator = new CalculatorModel(page);
    await calculator.performCalculation("35+/-");
    expect(calculator.displayWindow).toHaveText("-35");
    // Press 3
    // await page.locator("id=num_3").click();
    // // Press 5
    // await page.locator("id=num_5").click();
    // // Press +/-
    // await page.locator("id=toggle-negative").click();
    // Assert that the display shows -35
    // await expect(page.locator("id=display-text")).toHaveText("-35");
  });

  // * 00006 should be able to be entered and appear as just 6
  test.only("Enter a number with leading 0's and ensure they are removed from display", async () => {
    const calculator = new CalculatorModel(page);
    await calculator.performCalculation("00006");
    expect(calculator.displayWindow).toHaveText("6");
    // // Press 0, a total of 4 times
    // for (const _ of new Array(4)) {
    //   await page.locator("#num_0").click();
    // }
    // // Press 6
    // await page.locator("#num_6").click();
    // // Assert that the display shows 6
    // await expect(page.locator("#display-text")).toHaveText("6");
  });

  // * Entering % values, expressed as decimals
  test("Enter a percentage and see it reflected in decimal form", async ({
    page,
  }) => {
    // Press 5
    await page.locator("#num_5").click();
    // Press 0
    await page.locator("#num_0").click();
    // Press %
    await page.locator("#percentage-button").click();
    // Assert that the display shows 0.5
    await expect(page.locator("#display-text")).toHaveText("0.5");
  });

  // * Entering numbers that are converted to denominator values, expressed as decimals
  test("Enter a number and convert it to a denominator, expressed in decimal form", async ({
    page,
  }) => {
    // Press 3
    await page.locator("#num_3").click();
    // Press 1/x
    await page.locator("#inverse-fraction-button").click();
    // Assert that the display shows 0.33333333333
    await expect(page.locator("#display-text")).toHaveText("0.33333333333");
  });

  // * Entering pi
  test("Enter pi with one button", async ({ page }) => {
    // Press pi button
    await page.locator("id=pi-button").click();
    // Assert that the display shows 3.14159265359
    await expect(page.locator("#display-text")).toHaveText("3.14159265359");
  });

  // * Entering Euler's number
  test("Enter Euler's number with one button", async ({ page }) => {
    // Press e button
    await page.locator("id=euler-button").click();
    // Assert that the display shows 2.71828182846
    await expect(page.locator("#display-text")).toHaveText("2.71828182846");
  });

  // * Clearing numbers
  test("Enter a number and then press clear", async ({ page }) => {
    // Press 8
    await page.locator("#num_8").click();
    // Press 1
    await page.locator("#num_1").click();
    // Press 0
    await page.locator("#num_0").click();
    // Press clear
    await page.locator("#clear-button").click();
    // Assert that the display shows 0
    await page.locator("#display-text").click();
  });
});

// ? Simple Arithmetic Test Block
test.describe("Calculator should be able to perform arithmetic on two numbers", () => {
  test("Add Two Numbers", async ({ page }) => {
    // * 2 + 2 = 4
    // Press 2
    await page.locator("[id=num_2]").click();
    // Press +
    await page.locator("[id=add]").click();
    // Press 2
    await page.locator("[id=num_2]").click();
    // Press =
    await page.locator("[id=equals]").click();
    // Assert that the display text says 4
    await expect(page.locator("[id=display-text]")).toHaveText("4");
  });

  test("Subtract Two Numbers", async ({ page }) => {
    // * 5 - 4 = 1
    // Press 5
    await page.locator("[id=num_5]").click();
    // Press -
    await page.locator("[id=subtract]").click();
    // Press 4
    await page.locator("[id=num_4]").click();
    // Press =
    await page.locator("[id=equals]").click();
    // Assert that the display text says 1
    await expect(page.locator("[id=display-text]")).toHaveText("1");
  });

  test("Multiply Two Numbers", async ({ page }) => {
    // * 9 x 7 = 63
    // Press 9
    await page.locator("[id=num_9]").click();
    // Press multiply
    await page.locator("[id=multiply]").click();
    // Press 7
    await page.locator("[id=num_7]").click();
    // Press =
    await page.locator("[id=equals]").click();
    // Assert that the display text says 63
    await expect(page.locator("[id=display-text]")).toHaveText("63");
  });

  test("Divide Two Numbers", async ({ page }) => {
    // * 28 ÷ 7 = 4
    // Press 2
    await page.locator("[id=num_2]").click();
    // Press 8
    await page.locator("[id=num_8]").click();
    // Press divide
    await page.locator("[id=divide]").click();
    // Press 7
    await page.locator("[id=num_7]").click();
    // Press =
    await page.locator("[id=equals]").click();
    // Assert that the display text says 4
    await expect(page.locator("[id=display-text]")).toHaveText("4");
  });
});
