/**
 * truncate
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
function truncate(str, maxlength) {
  let newStr = "";

  if (str.length > maxlength) {
    newStr = str.substr(0, (maxlength - 1)) + "…";    
  } else newStr = str;
  return newStr;
}
