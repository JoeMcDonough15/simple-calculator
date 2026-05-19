/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // The test environment that will be used for testing
  // Using node because we want to avoid any UI at all.  This is only for unit and integration tests.  Playwright will handle all
  // e2e tests that would run in a browser testing environment.
  testEnvironment: "node",
  // The glob patterns Jest uses to detect test files - similar to the testDir on the playwright.config.js
  testMatch: ["**/__test__/*test.js"],
  // Transform is needed for translating ES6 import/export syntax into CommonJS for execution in node (Browsers understand ES6, Node.js does not)
  // This explains why we need babel in the project's dev dependencies.
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};

module.exports = config;
