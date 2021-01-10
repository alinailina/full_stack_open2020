// // Array.reduce()
// const numbers = [3,-2,3,4];

// const sum = numbers.reduce ((accumulator, currentValue) => {
//   return accumulator + currentValue;
// }, 0);

// // a = 0, c = 3 => a = 3
// // a = 3, c = -2 => a = 1
// // a = 1, c = 3 => a = 4
// // a = 4, c = 4 => a = 8

// console.log(sum); // 8

const palindrome = (string) => {
  return string
    .split("")
    .reverse()
    .join("");
};

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0) / array.length;
};

module.exports = {
  palindrome,
  average,
};