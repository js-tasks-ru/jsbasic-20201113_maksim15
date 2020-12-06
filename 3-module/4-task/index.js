/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  let arrUsersAge = users.filter(function(userObj) {
    return userObj.age <= age;
  });

  let arrUsersName = arrUsersAge.map(function(userAgeObj, index) {
    let usersName;
    if ((arrUsersAge.length - 1) == index) usersName = userAgeObj.name + ", " + userAgeObj.balance;
    else usersName = userAgeObj.name + ", " + userAgeObj.balance + "\n";
    return usersName;
  });

  let strUsersName = arrUsersName.join('');

  return strUsersName;
}
