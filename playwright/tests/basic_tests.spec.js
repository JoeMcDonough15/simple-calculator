import { test, expect, chromium } from "@playwright/test";
import CalculatorModel from "../calculatorModel";
import testData from "../testData";

let page;

test.beforeEach(async () => {
  const browser = await chromium.launch({
    slowMo: 1000,
  });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("http://localhost:3000");
});

test.afterEach(async () => {
  await page.close();
});

test.describe("Execute all tests in testData", () => {
  for (const testObj of testData) {
    test(testObj.testName, async () => {
      const calculator = new CalculatorModel(page);
      await calculator.performCalculation(testObj.problem);
      expect(calculator.displayWindow).toHaveText(testObj.solution);
    });
  }
});

test.describe("Manual tests", () => {
  test("Clear a number after entering it", async () => {
    await page.locator("id=num_1").click();
    await page.locator("id=clear-button").click();
    await expect(page.locator("id=display-text")).toHaveText("0");
  });
});
