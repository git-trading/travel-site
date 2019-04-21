import $ from 'jquery';

class Modal {
  constructor() {
    this.openModalButton = $('.open-modal');
    this.modal = $('.modal');
    this.closeModalButton = $('.modal__close');
    this.events();
  }

  events() {
    // clicking open modal button
    this.openModalButton.click(this.openModal.bind(this));
    // bind keeps the element of interest in context

    // clicking x close modal buton
    this.closeModalButton.click(this.closeModal.bind(this));

    // pushes any key
    $(document).keyup(this.keyPressHandler.bind(this));
  }

  keyPressHandler(e) {
    // if esc key is pressed
    if(e.keyCode == 27) {
      this.closeModal();
    }
  }

  openModal() {
    this.modal.addClass('modal--is-visible');
    return false; // prevents registering the click on the get in touch button
  }

  closeModal() {
    this.modal.removeClass('modal--is-visible');

  }

}

export default Modal;