import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let cartItem = this.cartItems.find(item => item.product.id == product.id);
    if (cartItem) {
      cartItem.count = cartItem.count + 1;
    } else {
      cartItem = { product: product, count: 1 };
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let cartItem = this.cartItems.find(item => item.product.id == productId);
    cartItem.count = cartItem.count + amount;
    if (cartItem.count == 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.reduce((count, item) => count + item.count, 0);
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    this.modalBody = document.createElement('DIV');
    for (let item of this.cartItems) {
      this.modalBody.append(this.renderProduct(item.product, item.count));
    }

    let counterButtons = this.modalBody.querySelectorAll('.cart-counter__button');
    for (let counterButton of counterButtons) {
      counterButton.addEventListener('click', this.onCounterButton.bind(this));
    }

    this.modalBody.append(this.renderOrderForm());
    this.modalBody.querySelector('form').onsubmit = this.onSubmit.bind(this);

    this.modal.setBody(this.modalBody);
    this.modal.open();
  }

  onCounterButton(event) {
    let currentProductId = event.target.closest('[data-product-id]').dataset.productId;
    let counterButtonPlus = event.target.closest('.cart-counter__button_plus');
    if (counterButtonPlus) {
      this.updateProductCount(currentProductId, 1);
    } else {
      this.updateProductCount(currentProductId, -1);
    }
  }

  onProductUpdate(cartItem) {
    // ...ваш код

    let productItem = cartItem.product;
    let countItem = cartItem.count;

    if (this.modal) {
      if (this.cartItems.length !== 0) {
        if (countItem !== 0) {
          // Элемент, который хранит количество товаров с таким productId в корзине
          let productCount = this.modalBody.querySelector(`[data-product-id="${productItem.id}"] .cart-counter__count`);
          productCount.innerHTML = countItem;
          // Элемент с общей стоимостью всех единиц этого товара
          let productPrice = this.modalBody.querySelector(`[data-product-id="${productItem.id}"] .cart-product__price`);
          productPrice.innerHTML = `€${(countItem * productItem.price).toFixed(2)}`;
          // Элемент с суммарной стоимостью всех товаров
          let infoPrice = this.modalBody.querySelector(`.cart-buttons__info-price`);
          infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
        } else {
          this.modalBody.querySelector(`[data-product-id="${productItem.id}"]`).remove();
        }
      } else {
        this.modal.close();
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
    event.preventDefault();

    let cartButton = this.modalBody.querySelector('[type="submit"]');
    cartButton.classList.add('is-loading');

    let cartForm = this.modalBody.querySelector('.cart-form');

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(cartForm),
    })
      .then(response => {
        if (response.status == 200) {
          this.modal.setTitle('Success!');
          cartButton.classList.remove('is-loading');
          this.cartItems = [];
          this.cartIcon.update(this);
          let succesBody = createElement(`
            <div class="modal__body-inner">
              <p>Order successful! Your order is being cooked :)
                <br>
                We’ll notify you about delivery time shortly.
                <br>
                <img src="/assets/images/delivery.gif">
              </p>
            </div>`);
          this.modal.setBody(succesBody);
        }
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

