import { initialCards, deleteCard, createCard, likeCard } from './components/cards.js';
import { openPopup, closePopup } from './components/modal.js';

//Список карточек
const cardsContainer = document.querySelector('.places__list');
// Страница
const pageContent = document.querySelector('.page__content');
// ----------Попапы----------
// Попап редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');

// Попап добавления нового места
const popupAdd = document.querySelector('.popup_type_new-card');
// Попап клика на картинку
const popupImage = document.querySelector('.popup_type_image');

// ----------Формы----------
// Форма редактирования профиля
const formEdit = document.forms['edit-profile'];
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
  const backImage = popupImage.querySelector('.popup__image');
  const backImageDescription = popupImage.querySelector('.popup__caption');
  backImage.src = evt.target.src;
  backImageDescription.textContent = evt.target.parentElement.querySelector('.card__title').textContent
  popupImage.classList.add('popup_is-opened');
  popupImage.addEventListener('click', closePopup);
}

// Функция отправки формы добавления новой карточки
function addFormSubmit(evt) {
  evt.preventDefault();
  const place = namePlace.value;
  const link = imageLink.value;
  cardsContainer.prepend(createCard(place, link, deleteCard, likeCard, clickCard));
  evt.target.parentElement.parentElement.classList.remove('popup_is-opened');
}

// Функция отправки формы изменения профиля
function handleFormSubmit(evt) {
    evt.preventDefault(); 

    const name = nameInput.value;
    const job = jobInput.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    profileTitle.textContent = name;
    profileDescription.textContent = job;
    evt.target.parentElement.parentElement.classList.remove('popup_is-opened');
}


// Вывод карточек на страницу
for(let i = 0; i<initialCards.length; i++) {
  cardsContainer.append(createCard(initialCards[i].name, initialCards[i].link, deleteCard, likeCard, clickCard));
}


// pageContent.addEventListener('keydown', closePopup);

// Обработка клика по кнопкам
pageContent.addEventListener('click', function (evt) {
  // Кнопка редактора профиля
  if (evt.target.classList.contains('profile__edit-button')) {
    openPopup(popupEdit);
  }
  // Кнопка добавления
  if (evt.target.classList.contains('profile__add-button')) {
    openPopup(popupAdd);
  }
})

// Обработка отправки форм
formEdit.addEventListener('submit', handleFormSubmit);
formAdd.addEventListener('submit', addFormSubmit);