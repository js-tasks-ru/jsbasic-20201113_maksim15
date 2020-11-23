/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  let newStr = "";
  
  if (str != "" && str != null) {
    newStr = str[0].toUpperCase() + str.slice(1);
  }
  return newStr;
}
