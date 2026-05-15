const testData = [
  // { testName: "Enter a one digit number", problem: "5", solution: "5" },
  // { testName: "Enter a two digit number", problem: "28", solution: "28" },
  // {
  //   testName:
  //     "Enter a 6 digit number and verify that the comma is added and in the right place",
  //   problem: "294345",
  //   solution: "294,345",
  // },
  // {
  //   testName:
  //     "Enter a decimal and verify the decimal point is in the correct place",
  //   problem: "75.39",
  //   solution: "75.39",
  // },
  // {
  //   testName:
  //     "Enter a number with multiple decimal points, and ensure there is only one",
  //   problem: "0...3",
  //   solution: "0.3",
  // },
  // {
  //   testName: "Enter a negative number",
  //   problem: "35+/-",
  //   solution: "-35",
  // },
  // {
  //   testName:
  //     "Enter a number with leading 0's and ensure they are removed from display",
  //   problem: "0000006",
  //   solution: "6",
  // },
  // {
  //   testName: "Enter a percentage and see it reflected in decimal form",
  //   problem: "50%",
  //   solution: "0.5",
  // },
  // {
  //   testName:
  //     "Enter a number and convert it to a denominator, expressed in decimal form",
  //   problem: "9/",
  //   solution: "0.11111111111",
  // },
  // {
  //   testName: "Enter pi with one button",
  //   problem: "π",
  //   solution: "3.14159265359",
  // },
  // {
  //   testName: "Enter Euler's number with one button",
  //   problem: "e",
  //   solution: "2.71828182846",
  // },
  // { testName: "Add Two Numbers", problem: "3+2=", solution: "5" },
  // { testName: "Subtract Two Numbers", problem: "5-4=", solution: "1" },
  // { testName: "Multiply Two Numbers", problem: "9*7=", solution: "63" },
  // { testName: "Divide Two Numbers", problem: "28÷7=", solution: "4" },
  // {
  //   testName: "Addition Before Multiplication",
  //   problem: "5+2*3*4=",
  //   solution: "29",
  // },
  // {
  //   testName: "Addition, Multiplication, and Subtraction",
  //   problem: "5+2*3-1=",
  //   solution: "10",
  // },
  // {
  //   testName: "Mixed operators with positive and negative values",
  //   problem: "8+/-+7*3-5+/-=",
  //   solution: "18",
  // },
  // {
  //   testName: "Include parenthesis",
  //   problem: "2*(6+2)=",
  //   solution: "16",
  // },
  // {
  //   testName: "Omit multiplication sign prior to parentheses opening",
  //   problem: "4+2(3-1+/-)=",
  //   solution: "12",
  // },
  // {
  //   testName: "Omit multiplication sign prior to parentheses opening 2",
  //   problem: "4+2(3-1)=",
  //   solution: "8",
  // },
  // {
  //   testName: "Multiple sets of parentheses",
  //   problem: "(5+4)*(9-2)=",
  //   solution: "63",
  // },
  // {
  //   testName:
  //     "Multiple sets of parentheses, omit multiplication sign prior to second set",
  //   problem: "(5+4)(9-2)=",
  //   solution: "63",
  // },
  // {
  //   testName: "Nested parentheses",
  //   problem: "(6+2)(4*2+3)÷(5(3-2))=",
  //   solution: "17.6",
  // },
  // {
  //   testName:
  //     "Multiple sets of parentheses with given operator prior to second set",
  //   problem: "(8*2)+(2-3*5)=",
  //   solution: "3",
  // },
  // {
  //   testName: "Keep running total with subtraction and no equals button",
  //   problem: "5-6-7-8-9-",
  //   solution: "-25",
  // },
  // {
  //   testName: "Replacing multiplication operator with equals sign",
  //   problem: "5+2*=",
  //   solution: "7",
  // },
  {
    testName: "Parenthesis and exponents",
    problem: "5*(3+2)^3=",
    solution: "625",
  },
  {
    testName: "More mixed operators",
    problem: "5*(4-1)+5=",
    solution: "20",
  },
  {
    testName: "More order of operations",
    problem: "4(20+10*(5+2)-4)+2=",
    solution: "346",
  },
  {
    testName: "Pi times the radius squared",
    problem: "π*2^2=",
    solution: "12.56637061436",
  },
  {
    testName: "Square a solution after pressing equals",
    problem: "4+5=^2",
    solution: "81",
  },
  {
    testName: "Square a number before adding",
    problem: "4+5^2=",
    solution: "29",
  },
  {
    testName: "Several nested parentheses",
    problem: "(((2+2)))=",
    solution: "4",
  },
  {
    testName: "Pressing equals should handle missing closed parentheses",
    problem: "(((2+2)=",
    solution: "4",
  },
  {
    testName:
      "Order of operations with parentheses omiting the multiplication sign",
    problem: "(5*(2+3))(4)=",
    solution: "100",
  },
  {
    testName:
      "Order of operations with parentheses omiting the multiplication sign and including incomplete addition",
    problem: "(5*(2+3))(4+)=",
    solution: "100",
  },
  {
    testName:
      "Forcing the operator outside the first set of parentheses to be * before 0",
    problem: "*(2+2)=",
    solution: "0",
  },
  {
    testName: "Simple parentheses",
    problem: "(2+2)=",
    solution: "4",
  },
  {
    testName: "Multiplying by an empty set of parentheses",
    problem: "2*()=",
    solution: "0",
  },
  {
    testName: "Outer set of parentheses left open",
    problem: "5*(2+3*(4+1)=",
    solution: "85",
  },
];

export default testData;
