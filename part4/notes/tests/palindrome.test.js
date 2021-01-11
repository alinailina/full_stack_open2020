const palindrome = require("../utils/for_testing").palindrome;

test("palindrome of dog", () => {
  expect(palindrome("dog")).toBe("god");
  // expect() wraps the resulting value into an object that offers a collection of Matcher functions that can be used for verifying the correctness of the result
});

test("palindrome of level", () => {
  expect(palindrome("level")).toBe("level");
});

test("palindrome of racecar", () => {
  expect(palindrome("racecar")).toBe("racecar");
});