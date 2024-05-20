import { deleteCard, createCard, likeCard } from './components/card.js';
import { closePopup, openPopup, closePopupByClick } from './components/modal.js';
import { initialCards } from './components/cards.js'
import '../pages/index.css'; // добавьте импорт главного файла стилей
//Список карточек
const cardsContainer = document.querySelector('.places__list');
// Кнопка добавления новой карточки
const profileAddButton = document.querySelector('.profile__add-button');
// Кнопка редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
// ----------Попапы----------
// Попап редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');

// Попап добавления нового места
const popupAdd = document.querySelector('.popup_type_new-card');
// Попап клика на картинку
const popupImage = document.querySelector('.popup_type_image');
const backImage = popupImage.querySelector('.popup__image');
const backImageDescription = popupImage.querySelector('.popup__caption');

const popups = [popupEdit, popupAdd, popupImage];
// ----------Формы----------
// Форма редактирования профиля
const formEdit = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// Поля формы редактирования профиля
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;
// Форма добавления новой карточки
const formAdd = document.forms['new-place'];
// Поля фоормы добавления новой карточки
const namePlace = formAdd.elements['place-name'];
const imageLink = formAdd.elements.link;


// Функция обработки клика по изобрадению карточки
function clickCard (evt) {
  backImage.src = evt.target.src;
  backImage.alt = evt.target.alt;
  backImageDescription.textContent = evt.target.closest('.card').querySelector('.card__title').textContent
  openPopup(popupImage);
}

// Функция отправки формы добавления новой карточки
function addFormSubmit(evt) {
  evt.preventDefault();
  const place = namePlace.value;
  const link = imageLink.value;
  cardsContainer.prepend(createCard(place, link, deleteCard, likeCard, clickCard));
  closePopup(popupAdd);
  formAdd.reset();
}

// Функция отправки формы изменения профиля
function editFormSubmit(evt) {
    evt.preventDefault(); 

    const name = nameInput.value;
    const job = jobInput.value;
    profileTitle.textContent = name;
    profileDescription.textContent = job;
    closePopup(popupEdit);
    formEdit.reset();
}

// Обработка закрытия попапа на кнопку или оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByClick);
});


// Вывод карточек на страницу
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card.name, card.link, deleteCard, likeCard, clickCard));
});

// Обработка клика на кнопку редактирования профиля
profileEditButton.addEventListener('click', function (evt) {
  formEdit.elements.name.value = profileTitle.textContent;
  formEdit.elements.description.value = profileDescription.textContent;
  openPopup(popupEdit);
});

profileAddButton.addEventListener('click', function (evt) {
    openPopup(popupAdd);
});

// Обработка отправки форм
formEdit.addEventListener('submit', editFormSubmit);
formAdd.addEventListener('submit', addFormSubmit);