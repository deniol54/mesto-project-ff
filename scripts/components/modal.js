// Функция открытия попапа
function openPopup (popup) {
  // Кнопка редактора профиля
  if (popup.classList.contains('popup_type_edit')) {
    const profileTitle = document.querySelector('.profile__title').textContent;
    const profileDescription = document.querySelector('.profile__description').textContent;
    const profileForm = document.forms['edit-profile'];
    profileForm.elements.name.value = profileTitle;
    profileForm.elements.description.value = profileDescription;
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closePopup);
    popup.addEventListener('keydown', closePopup);
  }
  // Кнопка добавления
  if (popup.classList.contains('popup_type_new-card')) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closePopup);
    popup.addEventListener('keydown', closePopup);
  }
}

// Функция закрытия попапа
function closePopup (evt) {
  if (evt.type === 'click') {
    if (evt.target.classList.contains('popup__close')) {
      evt.target.parentElement.parentElement.classList.remove('popup_is-opened');
      evt.target.parentElement.parentElement.removeEventListener('click', closePopup);  
    }
    if (evt.target.classList.contains('popup')) {
      
      evt.target.classList.remove('popup_is-opened');
      evt.target.removeEventListener('click', closePopup);
    }  
  }
  if (evt.type === 'keydown') {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_is-opened');
      popup.removeEventListener('click', closePopup);
      popup.classList.remove('popup_is-opened');
    }
  }
}

export {openPopup, closePopup};