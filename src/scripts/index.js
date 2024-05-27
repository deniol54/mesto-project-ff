import { deleteCard, createCard, likeCard } from './components/card.js';
import { closePopup, openPopup, closePopupByClick } from './components/modal.js';
// import { initialCards } from './components/cards.js';
import { clearValidation, enableValidation, validationConfig } from './components/validation.js';
import { getUserInfoAndCards, updateCardList, updateProfile, changeAvatarImage } from './components/api.js';
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
// Попап редактирования аватара
const popupAvatar = document.querySelector('.popup_type_avatar');

const popups = [popupEdit, popupAdd, popupImage, popupAvatar];
// ----------Формы----------
// Форма редактирования профиля
const formEdit = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
// Поля формы редактирования профиля
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;
// Форма добавления новой карточки
const formAdd = document.forms['new-place'];
// Поля фоормы добавления новой карточки
const namePlace = formAdd.elements['place-name'];
const imageLink = formAdd.elements.link;
// Форма редактиравания аватара
const formAvatar = document.forms['edit-avatar-image'];
// Поля формы редактирования аватара
const avatarImageLink = formAvatar.elements.avatar;


function renderLoading(isLoading, formElement) {
  const button = formElement.querySelector('.popup__button');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  }
  else {
    button.textContent = 'Сохранить';
  }
}

// Функция обработки клика по изображению карточки
function clickCard (evt) {
  backImage.src = evt.target.src;
  backImage.alt = evt.target.alt;
  backImageDescription.textContent = evt.target.closest('.card').querySelector('.card__title').textContent
  openPopup(popupImage);
}

// Функция отправки формы добавления новой карточки
function addFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formAdd);
  const place = namePlace.value;
  const link = imageLink.value;
  updateCardList(place, link)
    .then(res => cardsContainer.prepend(
      createCard(
        res.name,
        res.link,
        false,
        res.likes.length >0 ? res.likes.length: '',
        res._id,
        true, 
        deleteCard, 
        likeCard, 
        clickCard)
    ))
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      renderLoading(false, formAdd);
    });
  closePopup(popupAdd);
  formAdd.reset();
  clearValidation(formAdd, validationConfig);
}

// Функция отправки формы изменения профиля
function editFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, popupEdit);
    updateProfile(nameInput.value, jobInput.value)
      .then(res => {
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
      })
      .catch((err) => {
        console.log(err); 
      })
      .finally(() => {
        renderLoading(false, popupEdit);
      });
    closePopup(popupEdit);
    formEdit.reset();
}

// Функция отправки формы изменения аватара
function avatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupAvatar);
  changeAvatarImage(avatarImageLink.value)
    .then(res => {
      profileImage.style['background-image'] = `url(${res.avatar})`;
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      renderLoading(false, popupEdit);
    });

  closePopup(popupAvatar);
  formAvatar.reset();
  clearValidation(formAvatar, validationConfig);
}


// Инициализация начального состояния страницы
function initPage() {
  getUserInfoAndCards()
  .then((resArr) => {
    const [userInfo, cards] = resArr;
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style['background-image'] = `url(${userInfo.avatar})`;

    // Вывод карточек на страницу
    cards.forEach((card) => {
      const likeCount =  card.likes.length>0 ? String(card.likes.length): '';
      const isLiked = card.likes.some(user => {
        return user._id === userInfo._id;
      });
      const isOwner = card.owner._id === userInfo._id;
      cardsContainer.append(
        createCard(
          card.name, 
          card.link,
          isLiked,
          likeCount, 
          card._id, 
          isOwner,
          deleteCard, 
          likeCard, 
          clickCard));
    });
  })
  .catch((err) => {
    console.log(err); 
  });
}

//Вставляем карточки на страницу
initPage();

// Обработка закрытия попапа на кнопку или оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByClick);
});


// Обработка клика на кнопку редактирования профиля
profileEditButton.addEventListener('click', function (evt) {
  formEdit.elements.name.value = profileTitle.textContent;
  formEdit.elements.description.value = profileDescription.textContent;
  clearValidation(formEdit, validationConfig);
  openPopup(popupEdit);
});

profileAddButton.addEventListener('click', function (evt) {
    openPopup(popupAdd);
});

profileImage.addEventListener('click', evt => {
  openPopup(popupAvatar);
})

// Обработка отправки форм
formEdit.addEventListener('submit', editFormSubmit);
formAdd.addEventListener('submit', addFormSubmit);
formAvatar.addEventListener('submit', avatarFormSubmit)

// Включение валидации
enableValidation(validationConfig);