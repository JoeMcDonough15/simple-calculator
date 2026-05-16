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
      if (testObj.testName.includes("Clear button text should change")) {
        expect(calculator.clear).toHaveText(testObj.solution);
      } else {
        expect(calculator.displayWindow).toHaveText(testObj.solution);
      }
    });
  }
});
