// Содержимое страницы
const pageContent = document.querySelector('.page__content');

// Функция закрытия попапа по клику
function closePopupByClick (evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

// Функция закрытия попапа по нажатию Escape
function closePopupByEscape (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

// Функция открытия попапа
function openPopup (popup) {
    popup.classList.add('popup_is-opened');
    pageContent.addEventListener('keydown', closePopupByEscape);
}

// Функция закрытия попапа
function closePopup (popup) {
  pageContent.removeEventListener('keydown', closePopup);
  popup.classList.remove('popup_is-opened');
}

export {openPopup, closePopup, closePopupByClick};