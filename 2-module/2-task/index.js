/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  let checkObj = true;
  
  for (let key in obj) {
    checkObj = false;
  }
  return checkObj;
}
