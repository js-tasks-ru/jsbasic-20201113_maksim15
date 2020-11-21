/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let result;
  if (n == 0 || n == 1) {
    result = 1;
  } else {
    result = 1;
    for (let i = 2; i <= n; i++) {
      result = result * i;
    }
  }
  return result;
}
