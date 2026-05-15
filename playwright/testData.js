const testData = [
  { testName: "Enter a one digit number", problem: "5", solution: "5" },
  { testName: "Enter a two digit number", problem: "28", solution: "28" },
  {
    testName:
      "Enter a 6 digit number and verify that the comma is added and in the right place",
    problem: "294345",
    solution: "294,345",
  },

  {
    testName:
      "Enter a decimal and verify the decimal point is in the correct place",
    problem: "75.39",
    solution: "75.39",
  },
  {
    testName:
      "Enter a number with multiple decimal points, and ensure there is only one",
    problem: "0...3",
    solution: "0.3",
  },
  {
    testName: "Enter a negative number",
    problem: "35+/-",
    solution: "-35",
  },
  {
    testName:
      "Enter a number with leading 0's and ensure they are removed from display",
    problem: "0000006",
    solution: "6",
  },
  {
    testName: "Enter a percentage and see it reflected in decimal form",
    problem: "50%",
    solution: "0.5",
  },
  {
    testName:
      "Enter a number and convert it to a denominator, expressed in decimal form",
    problem: "9/",
    solution: "0.11111111111",
  },
  {
    testName: "Enter pi with one button",
    problem: "π",
    solution: "3.14159265359",
  },
  {
    testName: "Enter Euler's number with one button",
    problem: "e",
    solution: "2.71828182846",
  },

  { testName: "Add Two Numbers", problem: "3+2=", solution: "5" },
  { testName: "Subtract Two Numbers", problem: "5-4=", solution: "1" },
  { testName: "Multiply Two Numbers", problem: "9*7=", solution: "63" },
  { testName: "Divide Two Numbers", problem: "28÷7=", solution: "4" },
  {
    testName: "Addition Before Multiplication",
    problem: "5+2*3*4=",
    solution: "29",
  },
  {
    testName: "Addition, Multiplication, and Subtraction",
    problem: "5+2*3-1=",
    solution: "10",
  },
  {
    testName: "Mixed operators with positive and negative values",
    problem: "8+/-+7*3-5+/-=",
    solution: "18",
  },
];

export default testData;
