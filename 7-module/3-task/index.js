export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
  }

  render() {
    //<!-------- Корневой элемент слайдера -------->
    this.slider = document.createElement('DIV');
    this.slider.classList.add('slider');
    document.body.append(this.slider);

    //<!-------- Ползунок слайдера с активным значением -------->
    this.sliderValue = `
    <div class="slider__thumb">
      <span class="slider__value">${this.value}</span>
    </div>
    `;
    this.slider.insertAdjacentHTML('beforeend', this.sliderValue);
    let valuePercentage = this.value / (this.steps - 1) * 100;
    this.slider.querySelector('.slider__thumb').style.left = `${valuePercentage}%`;

    //<!-------- Заполненная часть слайдера -------->
    this.sliderProgress = document.createElement('DIV');
    this.sliderProgress.classList.add('slider__progress');
    this.slider.append(this.sliderProgress);
    this.slider.querySelector('.slider__progress').style.width = `${valuePercentage}%`;


    //<!-------- Шаги слайдера -------->
    this.sliderSteps = document.createElement('DIV');
    this.sliderSteps.classList.add('slider__steps');
    this.slider.append(this.sliderSteps);
    for (let i = 0; i < this.steps; i++) {
      let step = '';
      if (i === this.value) {
        step = `<span data-step="${i}" class="slider__step-active"></span>`;
      } else {
        step = `<span data-step="${i}"></span>`;
      }
      this.sliderSteps.insertAdjacentHTML('beforeend', step);
    }

    //<!-------- Изменение значение слайдера по клику-------->
    this.slider.addEventListener('click', this.change.bind(this));

    return this.slider;
  }

  change(event) {
    //<! Определяем расстояние от начала слайда до места клика>
    let left = event.clientX - this.slider.getBoundingClientRect().left;
    //<! Определяем относительное значение от ширины слайда>
    let leftRelative = left / this.slider.offsetWidth;
    //<! Определяем приближенное значение слайда>
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    //<! Определяем значение слайда в процентах>
    let valuePercents = value / segments * 100;

    this.slider.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
    this.slider.querySelector('.slider__progress').style.width = `${valuePercents}%`;

    this.slider.querySelector('.slider__value').innerHTML = value;

    for (let j = 0; j < this.steps; j++) {
      let step = this.slider.querySelector(`[data-step="${j}"]`);
      step.classList.remove('slider__step-active');
    }

    let stepActive = this.slider.querySelector(`[data-step="${value}"]`);
    stepActive.classList.add('slider__step-active');

    let sliderChange = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    });
    this.slider.dispatchEvent(sliderChange);
  }
}