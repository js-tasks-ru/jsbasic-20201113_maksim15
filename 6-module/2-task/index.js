import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.card = product;
    this.elem = this.render();
  }

  render() {
    this.productCard = document.createElement('DIV');
    this.productCard.classList.add('card');
    document.body.append(this.productCard);

    this.cardTop = document.createElement('DIV');
    this.cardTop.classList.add('card__top');
    this.productCard.append(this.cardTop);

    this.cardImg = document.createElement('IMG');
    this.cardImg.setAttribute('src', `/assets/images/products/${this.card.image}`);
    this.cardImg.classList.add('card__image');
    this.cardImg.setAttribute('alt', 'product');
    this.cardTop.append(this.cardImg);

    this.cardSpan = document.createElement('SPAN');
    this.cardSpan.classList.add('card__price');
    this.cardSpan.innerHTML = String.fromCharCode(8364) + `${this.card.price.toFixed(2)}`;
    this.cardTop.append(this.cardSpan);

    this.cardBody = document.createElement('DIV');
    this.cardBody.classList.add('card__body');
    this.productCard.append(this.cardBody);

    this.cardTitle = document.createElement('DIV');
    this.cardTitle.classList.add('card__title');
    this.cardTitle.innerHTML = this.card.name;
    this.cardBody.append(this.cardTitle);

    this.cardButton = document.createElement('BUTTON');
    this.cardButton.setAttribute('type', 'button');
    this.cardButton.classList.add('card__button');
    this.cardBody.append(this.cardButton);

    this.buttonImg = document.createElement('IMG');
    this.buttonImg.setAttribute('src', '/assets/images/icons/plus-icon.svg');
    this.buttonImg.setAttribute('alt', 'icon');
    this.cardButton.append(this.buttonImg);

    let productId = this.card.id;

    this.cardButton.addEventListener('click', function () {
      let eventAdd = new CustomEvent('product-add', {
        detail: productId,
        bubbles: true
      });
      document.querySelector('.card__button').dispatchEvent(eventAdd);
    });

    return this.productCard;
  }
}
