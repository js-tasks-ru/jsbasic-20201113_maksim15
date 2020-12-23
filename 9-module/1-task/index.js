/**
 * promiseClick
 * @param {Element} button index
 * @returns {Promise}
 */

export default function promiseClick(button) {
  // ваш код...
  let promise = new Promise(function (resolve, reject) {
    button.addEventListener('click', function (event) {
      resolve(event);
    }, { once: true });
  });
  return promise;
}
