import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
  }

  render() {
    // <!---------- Корневой элемент RibbonMenu ---------->
    this.ribbonMenu = document.createElement('DIV');
    this.ribbonMenu.classList.add('ribbon');
    document.body.append(this.ribbonMenu);

    // <!---------- Кнопка прокрутки влево ---------->
    let buttonLeft = `
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;
    this.ribbonMenu.insertAdjacentHTML('beforeend', buttonLeft);

    // <!---------- Ссылки на категории ---------->
    this.ribbon = document.createElement('NAV');
    this.ribbon.classList.add('ribbon__inner');
    this.ribbonMenu.append(this.ribbon);

    for (let i = 0; i < this.categories.length; i++) {
      let ribbonItem = `
        <a href="#" class="ribbon__item" data-id="${this.categories[i].id}">${this.categories[i].name}</a>
      `;
      this.ribbon.insertAdjacentHTML('beforeend', ribbonItem);
    }
    document.querySelector('.ribbon__item').classList.add('ribbon__item_active');

    // <!---------- Кнопка прокрутки вправо ---------->
    let buttonRight = `
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;
    this.ribbonMenu.insertAdjacentHTML('beforeend', buttonRight);
    document.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');

    // <!---------- Переключение меню по стрелкам ---------->
    let iconRight = document.querySelector('.ribbon__arrow_right');
    let iconLeft = document.querySelector('.ribbon__arrow_left');
    let ribbonInner = document.querySelector('.ribbon__inner');

    iconRight.addEventListener('click', function () {
      ribbonInner.scrollBy(350, 0);
      setTimeout(scroll, 500);
    });
    iconLeft.addEventListener('click', function () {
      ribbonInner.scrollBy(-350, 0);
      setTimeout(scroll, 500);
    });

    // <!---------- Функция для скрыти/отображения кнопок переключения ---------->
    function scroll() {
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;

      let scrollLeft = ribbonInner.scrollLeft;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft == 0) {
        iconLeft.classList.remove('ribbon__arrow_visible');
      } else {
        iconLeft.classList.add('ribbon__arrow_visible');
      }
      if (scrollRight < 1) {
        iconRight.classList.remove('ribbon__arrow_visible');
      } else {
        iconRight.classList.add('ribbon__arrow_visible');
      }
    }

    // <!---------- Выбор конкретной категории в меню ---------->
    let ribbonItemAll = document.querySelectorAll('.ribbon__item');
    for (let j = 0; j < ribbonItemAll.length; j++) {
      ribbonItemAll[j].addEventListener('click', function (event) {
        event.preventDefault();

        let ribbonItems = document.querySelectorAll('.ribbon__item');
        for (let ribbonItem of ribbonItems) {
          ribbonItem.classList.remove('ribbon__item_active');
        }

        ribbonItemAll[j].classList.add('ribbon__item_active');

        let eventAdd = new CustomEvent('ribbon-select', {
          detail: ribbonItemAll[j].dataset.id,
          bubbles: true
        });
        ribbonItemAll[j].dispatchEvent(eventAdd);
      });
    }

    return this.ribbonMenu;
  }
}