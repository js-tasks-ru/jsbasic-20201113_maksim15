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

    //<!-------- Изменение значение слайдера по Drag-and-Drop -------->
    this.slider.addEventListener('pointerdown', this.onPointerDown.bind(this));

    return this.slider;
  }

  //<!-------- Изменение значение слайдера по клику-------->
  change(event) {
    // Определяем расстояние от начала слайда до места клика
    let left = event.clientX - this.slider.getBoundingClientRect().left;
    // Определяем относительное значение от ширины слайда
    let leftRelative = left / this.slider.offsetWidth;
    // Определяем приближенное значение слайда
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    // Определяем значение слайда в процентах
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

  //<!-------- Изменение значение слайдера по Drag-and-Drop -------->
  onPointerDown(event) {
    let slider = this.slider;
    let steps = this.steps;
    let sliderThumb = slider.querySelector('.slider__thumb');

    // Отменяем действие браузера по умолчанию - выделения
    event.preventDefault();
    // Отменяем встроенный браузерный Drag-and-Drop    
    sliderThumb.ondragstart = () => false;

    slider.classList.add('slider_dragging');

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);

    function onPointerMove(event) {
      // Определяем расстояние от начала слайда до места клика
      let newleft = event.clientX - slider.getBoundingClientRect().left;
      // Определяем относительное значение от ширины слайда
      let leftRelative = newleft / slider.offsetWidth;

      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }
      // Определяем значение слайда в процентах
      let leftPercents = leftRelative * 100;

      slider.querySelector('.slider__thumb').style.left = `${leftPercents}%`;
      slider.querySelector('.slider__progress').style.width = `${leftPercents}%`;

      // Определяем приближенное значение слайда
      let segments = steps - 1;
      let approximateValue = leftRelative * segments;
      let newValue = Math.round(approximateValue);

      slider.querySelector('.slider__value').innerHTML = newValue;

      for (let j = 0; j < steps; j++) {
        let step = slider.querySelector(`[data-step="${j}"]`);
        step.classList.remove('slider__step-active');
      }

      let newStepActive = slider.querySelector(`[data-step="${newValue}"]`);
      newStepActive.classList.add('slider__step-active');
    }

    function onPointerUp() {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      slider.classList.remove('slider_dragging');

      // Определяем текущее значение слайда в момент перемещения ползунка
      let currentValue = Number(slider.querySelector('.slider__value').innerHTML);
      let currentPercents = currentValue / (steps - 1) * 100;

      slider.querySelector('.slider__thumb').style.left = `${currentPercents}%`;
      slider.querySelector('.slider__progress').style.width = `${currentPercents}%`;

      let sliderChange = new CustomEvent('slider-change', {
        detail: currentValue,
        bubbles: true
      });
      slider.dispatchEvent(sliderChange);
    }
  }
}