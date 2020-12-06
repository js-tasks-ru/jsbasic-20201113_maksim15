/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let arrWord = str.split('-');
  let arrWordUp = arrWord.map(function(word, index) {
    let wordUp = (index == 0) ? word : word[0].toUpperCase() + word.slice(1);
    return wordUp;
  });
  let wordUpStr = arrWordUp.join('');
  return wordUpStr;
}
