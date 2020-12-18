function toggleText() {
  let text = document.querySelector('#text');
  let button = document.querySelector('.toggle-text-button');

  button.addEventListener('click', function () {
    if (text.hasAttribute('hidden') === false) {
      text.setAttribute('hidden', true);
    } else text.removeAttribute('hidden');
  });
}
