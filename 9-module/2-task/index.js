import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // ... ваш код
    // Создаём экземпляр компонента Carousel, передав ему массив слайдов slides
    let carousel = new Carousel(slides);
    let carouselHolder = document.body.querySelector('[data-carousel-holder]');
    carouselHolder.append(carousel.elem);

    // Создаём экземпляр компонента RibbonMenu, передав ему массив категорий categories
    let ribbonMenu = new RibbonMenu(categories);
    let ribbonHolder = document.body.querySelector('[data-ribbon-holder]');
    ribbonHolder.append(ribbonMenu.elem);

    // Создаём экземпляр компонента StepSlider для 5-и шагов с начальным значением – 3
    let stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    let sliderHolder = document.body.querySelector('[data-slider-holder]');
    sliderHolder.append(stepSlider.elem);

    // Создаём экземпляр компонента CartIcon
    let cartIcon = new CartIcon();
    let cartIconHolder = document.body.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(cartIcon.elem);

    // Создаём экземпляр компонента Cart
    let cart = new Cart(cartIcon);

    // Получаем список товара, который храниться на сервере по url
    const urlServerProducts = 'products.json';
    let response = await fetch(urlServerProducts);
    if (response.ok) {
      let products = await response.json();

      // Создаём экземпляр компонента ProductsGrid
      let productsGrid = new ProductsGrid(products);
      let productsGridHolder = document.body.querySelector('[data-products-grid-holder]');
      productsGridHolder.innerHTML = '';
      productsGridHolder.append(productsGrid.elem);

      // Фильтрация товаров после получения с сервера
      productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: stepSlider.value,
        category: ribbonMenu.value
      });

      // Добавляем событие по добавлению продукта в корзину
      document.body.addEventListener('product-add', function (event) {
        let addProductId = event.detail;
        let productToAdd = products.find(product => product.id == addProductId);
        if (productToAdd) {
          cart.addProduct(productToAdd);
        }
      });
      // Добавляем событие по фильтру слайда
      document.body.addEventListener('slider-change', function (event) {
        productsGrid.updateFilter({
          maxSpiciness: event.detail // значение остроты из события 'slider-change'
        });
      });

      // Добавляем событие по фильтру ленты-меню
      document.body.addEventListener('ribbon-select', function (event) {
        productsGrid.updateFilter({
          category: event.detail // категория из события 'ribbon-select'
        });
      });

      // Фильтрация по изменению чекбокосов
      let nutsCheckbox = document.getElementById('nuts-checkbox');
      nutsCheckbox.addEventListener('change', function (event) {
        productsGrid.updateFilter({
          noNuts: event.target.checked // новое значение чекбокса 'nuts-checkbox'
        });
      });
      let vegeterianCheckbox = document.getElementById('vegeterian-checkbox');
      vegeterianCheckbox.addEventListener('change', function (event) {
        productsGrid.updateFilter({
          vegeterianOnly: event.target.checked // новое значение чекбокса 'vegeterian-checkbox'
        });
      });
    }
  }
}
