import { test, expect } from "@playwright/test";

test("Add Two Numbers", async ({ page }) => {
  // * 2 + 2 = 4
  await page.goto("http://localhost:3000");
  await page.pause();
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
  await expect(page.locator("[id=display-text]")).toHaveText("4");
  await page.close();
});

test("Subtract Two Numbers", async ({ page }) => {
  // * 5 - 4 = 1
  await page.goto("http://localhost:3000");
  await page.pause();
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
  // Assert that the difference is 1
  await expect(page.locator("[id=display-text]")).toHaveText("1");
  await page.close();
});

test("Multiply Two Numbers", async ({ page }) => {
  // * 9 x 7 = 63
  await page.goto("http://localhost:3000");
  await page.pause();
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
  // Assert that the product is 63
  await expect(page.locator("[id=display-text]")).toHaveText("63");
  await page.close();
});

test("Divide Two Numbers", async ({ page }) => {
  // * 28 ÷ 7 = 4
  await page.goto("http://localhost:3000");
  await page.pause();
  // Click 2
  await page.locator("[id=num_2]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("2");
  // Click 8
  await page.locator("[id=num_8]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("28");
  // Click divide
  await page.locator("[id=divide]").click();
  // Click 7
  await page.locator("[id=num_7]").click();
  await expect(page.locator("[id=display-text]")).toHaveText("7");
  // Click =
  await page.locator("[id=equals]").click();
  // Assert that the product is 63
  await expect(page.locator("[id=display-text]")).toHaveText("4");
  await page.close();
});
