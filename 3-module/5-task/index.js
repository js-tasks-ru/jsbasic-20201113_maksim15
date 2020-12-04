/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let arrDataNoWSpace = str.split(' ');
  let strData = arrDataNoWSpace.join(',');
  let arrDataNoComma = strData.split(',');
  
  let arrNumber = arrDataNoComma.filter(function(item) {
    let resultNumber;
    if (Number(item) != NaN) resultNumber = Number(item);
    return resultNumber;
  });
  return {
    min: Math.min.apply(null, arrNumber),
    max: Math.max.apply(null, arrNumber)
  };
}
