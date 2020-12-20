import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.open();
    this.setTitle();
    this.setBody();
  }

  render() {
    // <!---------- Корневой элемент Modal ---------->
    this.modal = document.createElement('DIV');
    this.modal.classList.add('modal');
    // <!---------- Прозрачная подложка перекрывающая интерфейс ---------->
    let modalOverlay = `
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">        
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div>
      <div class="modal__body"></div>
    </div>
    `;
    this.modal.insertAdjacentHTML('beforeend', modalOverlay);

    let buttonIcon = this.modal.querySelector('.modal__close');
    buttonIcon.addEventListener('click', this.close.bind(this));

    window.addEventListener('keydown', this.closeEsc.bind(this));

    return this.modal;
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add('is-modal-open');
    return;
  }

  setTitle(modalTitle) {
    this.modal.querySelector('.modal__title').innerHTML = modalTitle;
    return;
  }

  setBody(modalBody) {
    this.modal.querySelector('.modal__body').innerHTML = '';
    this.modal.querySelector('.modal__body').append(modalBody);
    return;
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    return;
  }

  closeEsc(event) {
    if (event.code === 'Escape') {
      this.modal.remove();
      document.body.classList.remove('is-modal-open');
    }
    return;
  }
}