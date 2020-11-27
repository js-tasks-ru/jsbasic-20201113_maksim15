/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let summaSalary = 0;

  for (let key in salaries) {
    if (typeof salaries[key] == "number") {
      summaSalary += salaries[key];
    }
  }
  return summaSalary;
}
