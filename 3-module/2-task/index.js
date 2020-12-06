/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  let filterArr = arr.filter(function(elementArr) {
    return (a <= elementArr && elementArr <= b);
  });
  return filterArr;
}
