const concatenateNextGroup = (numString, nextGroupNum) => {
  let nextGroupString = nextGroupNum.toString();
  if (nextGroupNum < 100 && nextGroupNum > 9) {
    numString = `,0${nextGroupString}` + numString;
  } else if (nextGroupNum < 10) {
    numString = `,00${nextGroupString}` + numString;
  } else {
    numString = `,${nextGroupString}` + numString;
  }
  return numString;
};

const addCommasToNumString = (numString) => {
  let decimalValue = "";
  let possibleNegative = "";
  if (numString.includes(".")) {
    const indexOfDecimal = numString.indexOf(".");
    decimalValue += numString.slice(indexOfDecimal);
    numString = numString.slice(0, indexOfDecimal);
  }
  let num = Number(numString);
  if (num < 0) {
    possibleNegative += "-";
    num = 0 - num;
  }
  let numCommas = Math.floor(Math.log10(num) / 3);
  if (num === 0 || numCommas === 0) {
    return numString + decimalValue;
  }
  let fixedNum = "";
  while (numCommas > 0) {
    const group = num % 1000;
    fixedNum = concatenateNextGroup(fixedNum, group);
    num = Math.floor(num / 1000);
    numCommas--;
  }
  fixedNum = `${possibleNegative}${num}${fixedNum}${decimalValue}`;
  return fixedNum;
};

export default addCommasToNumString;
