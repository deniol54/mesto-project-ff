// Функция открытия попапа
function openPopup (popup) {
  // Кнопка редактора профиля
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        closePopup(popup);
      }
    });
    popup.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        closePopup(popup);
      }
    });
}

// Функция закрытия попапа
function closePopup (popup) {
  popup.removeEventListener('click', closePopup);
  popup.removeEventListener('keydown', closePopup);
  popup.classList.remove('popup_is-opened');
}

export {openPopup, closePopup};