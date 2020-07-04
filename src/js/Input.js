import Image from './Image';

export default class Input {
  constructor() {
    this.nameInput = document.querySelector('.img-name');
    this.urlInput = document.querySelector('.img-url');
    this.uploadButton = document.querySelector('.upload-button');
    this.imageContainer = document.querySelector('.img-container');
    this.errorElement = document.querySelector('.error');
  }

  init() {
    this.addListners();
  }

  addListners() {
    this.uploadButton.addEventListener('click', (el) => {
      el.preventDefault();
      this.loadImage();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.loadImage();
      }
    });

    this.nameInput.addEventListener('focus', () => this.removeError());
    this.urlInput.addEventListener('focus', () => this.removeError());
  }

  loadImage() {
    if (this.checkImageName()) {
      const url = this.urlInput.value;
      this.testLoadImg(url);
    }
  }

  insertImage(url) {
    const name = this.nameInput.value;
    const newImage = new Image(name, url);
    const imageEl = newImage.getImageElemennt();
    this.imageContainer.insertAdjacentElement('beforeend', imageEl);
    this.addRemoveListner(imageEl);
    this.clearInputs();
  }

  addRemoveListner(img) {
    img.querySelector('.remove-button').addEventListener('click', () => this.removeImage(img));
  }

  removeImage(img) {
    this.imageContainer.removeChild(img);
  }

  checkImageName() {
    if (this.nameInput.value === '') {
      this.showError(this.nameInput, 'Введите название');
      return false;
    }
    return true;
  }

  testLoadImg(url) {
    const img = document.createElement('img');
    img.src = url;
    img.onload = () => this.insertImage(url);
    img.onerror = () => this.showError(this.urlInput, 'Неверный URL изображения');
  }

  showError(input, errorText) {
    this.errorElement.textContent = errorText;
    this.errorElement.style.left = `${input.offsetLeft + input.offsetWidth + 5}px`;
    this.errorElement.style.top = `${input.offsetTop - 4}px`;
    this.errorElement.classList.remove('hidden');
  }

  removeError() {
    this.errorElement.classList.add('hidden');
  }

  clearInputs() {
    this.nameInput.value = '';
    this.urlInput.value = '';
  }
}
