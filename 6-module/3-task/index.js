import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  render() {
    // <!--------------- Корневой элемент карусели --------------->
    this.carousel = document.createElement('DIV');
    this.carousel.classList.add('carousel');
    document.body.append(this.carousel);

    // <!--------------- Кнопки переключения --------------->
    this.iconRight = document.createElement('DIV');
    this.iconRight.classList.add('carousel__arrow');
    this.iconRight.classList.add('carousel__arrow_right');
    this.carousel.append(this.iconRight);

    this.iconRightImg = document.createElement('IMG');
    this.iconRightImg.setAttribute('src', '/assets/images/icons/angle-icon.svg');
    this.iconRightImg.setAttribute('alt', 'icon');
    this.iconRight.append(this.iconRightImg);

    this.iconLeft = document.createElement('DIV');
    this.iconLeft.classList.add('carousel__arrow');
    this.iconLeft.classList.add('carousel__arrow_left');
    this.carousel.append(this.iconLeft);

    this.iconLeftImg = document.createElement('IMG');
    this.iconLeftImg.setAttribute('src', '/assets/images/icons/angle-left-icon.svg');
    this.iconLeftImg.setAttribute('alt', 'icon');
    this.iconLeft.append(this.iconLeftImg);

    // <!--------------- Элемент - Карусель --------------->
    this.carouselInner = document.createElement('DIV');
    this.carouselInner.classList.add('carousel__inner');
    this.carousel.append(this.carouselInner);

    for (let elemObj = 0; elemObj < this.slides.length; elemObj++) {
      this.carouselSlide = document.createElement('DIV');
      this.carouselSlide.classList.add('carousel__slide');
      this.carouselSlide.dataset.id = `${this.slides[elemObj].id}`;
      this.carouselInner.append(this.carouselSlide);

      this.carouselImg = document.createElement('IMG');
      this.carouselImg.setAttribute('src', `/assets/images/carousel/${this.slides[elemObj].image}`);
      this.carouselImg.classList.add('carousel__img');
      this.carouselImg.setAttribute('alt', 'slide');
      this.carouselSlide.append(this.carouselImg);

      this.carouselCaption = document.createElement('DIV');
      this.carouselCaption.classList.add('carousel__caption');
      this.carouselSlide.append(this.carouselCaption);

      this.carouselPrice = document.createElement('SPAN');
      this.carouselPrice.classList.add('carousel__price');
      this.carouselPrice.innerHTML = String.fromCharCode(8364) + `${this.slides[elemObj].price.toFixed(2)}`;
      this.carouselCaption.append(this.carouselPrice);

      this.carouselTitle = document.createElement('DIV');
      this.carouselTitle.classList.add('carousel__title');
      this.carouselTitle.innerHTML = this.slides[elemObj].name;
      this.carouselCaption.append(this.carouselTitle);

      this.carouselButton = document.createElement('BUTTON');
      this.carouselButton.setAttribute('type', 'button');
      this.carouselButton.classList.add('carousel__button');
      this.carouselCaption.append(this.carouselButton);

      this.carouselButtonImg = document.createElement('IMG');
      this.carouselButtonImg.setAttribute('src', '/assets/images/icons/plus-icon.svg');
      this.carouselButtonImg.setAttribute('alt', 'icon');
      this.carouselButton.append(this.carouselButtonImg);
    }

    // <!--------------- Событие при клике на "+" --------------->
    let carouselButtonAll = document.querySelectorAll('.carousel__button');
    let carouselSlideAll = document.querySelectorAll('.carousel__slide');
    for (let i = 0; i < carouselSlideAll.length; i++) {
      carouselButtonAll[i].addEventListener('click', function () {
        let eventAdd = new CustomEvent('product-add', {
          detail: carouselSlideAll[i].dataset.id,
          bubbles: true
        });
        carouselButtonAll[i].dispatchEvent(eventAdd);
      });
    }

    // <!--------------- Переключение слайдов по стрелкам --------------->
    let iconRight = document.querySelector('.carousel__arrow_right');
    let iconLeft = document.querySelector('.carousel__arrow_left');

    let carousel = document.querySelector('.carousel__inner');

    let slide = 1;
    let position = 0;
    let slidesLen = this.slides.length;

    if (slide === 1) {
      this.iconLeft.style.display = 'none';
      this.iconRight.style.display = '';
    }

    this.iconRight.addEventListener('click', function () {
      position = position + carousel.offsetWidth;
      carousel.style.transform = `translateX(-${position}px)`;
      slide = slide + 1;
      if (slide !== slidesLen) {
        iconLeft.style.display = '';
        iconRight.style.display = '';
      } else {
        iconLeft.style.display = '';
        iconRight.style.display = 'none';
      }
    });

    this.iconLeft.addEventListener('click', function () {
      position = position - carousel.offsetWidth;
      carousel.style.transform = `translateX(-${position}px)`;
      slide = slide - 1;
      if (slide !== 1) {
        iconLeft.style.display = '';
        iconRight.style.display = '';
      } else {
        iconLeft.style.display = 'none';
        iconRight.style.display = '';
      }
    });

    return this.carousel;
  }
}