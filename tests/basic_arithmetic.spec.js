import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("Add Two Numbers", async ({ page }) => {
  // * 2 + 2 = 4
  // Click 2
  await page.locator("[id=num_2]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("2");
  // Click +
  await page.locator("[id=add]").click();
  // Click 2
  await page.locator("[id=num_2]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("2");
  // Click =
  await page.locator("[id=equals]").click();
  // Assert that the display text says 4
  await expect(page.locator("[id=display-text]")).toHaveText("4");
  await page.close();
});

test("Subtract Two Numbers", async ({ page }) => {
  // * 5 - 4 = 1
  // Click 5
  await page.locator("[id=num_5]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("5");
  // Click -
  await page.locator("[id=subtract]").click();
  // Click 4
  await page.locator("[id=num_4]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("4");
  // Click =
  await page.locator("[id=equals]").click();
  // Assert that the display text says 1
  await expect(page.locator("[id=display-text]")).toHaveText("1");
});

test("Multiply Two Numbers", async ({ page }) => {
  // * 9 x 7 = 63
  // Click 9
  await page.locator("[id=num_9]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("9");
  // Click multiply
  await page.locator("[id=multiply]").click();
  // Click 7
  await page.locator("[id=num_7]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("7");
  // Click =
  await page.locator("[id=equals]").click();
  // Assert that the display text says 63
  await expect(page.locator("[id=display-text]")).toHaveText("63");
});

test("Divide Two Numbers", async ({ page }) => {
  // * 28 ÷ 7 = 4
  // Click 2
  await page.locator("[id=num_2]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("2");
  // Click 8
  await page.locator("[id=num_8]").click();
  // Assert that the display text says 28
  await expect(page.locator("[id=display-text]")).toHaveText("28");
  // Click divide
  await page.locator("[id=divide]").click();
  // Click 7
  await page.locator("[id=num_7]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("7");
  // Click =
  await page.locator("[id=equals]").click();
  // Assert that the display text says 4
  await expect(page.locator("[id=display-text]")).toHaveText("4");
});
