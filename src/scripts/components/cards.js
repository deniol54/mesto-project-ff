const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

function deleteCard(event) {
  event.target.parentElement.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function createCard(cardName, cardImgLink, deleteCardFunction, likeCardFunction, clickCardFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__image').src = cardImgLink;
  cardDeleteButton.addEventListener('click', deleteCardFunction);
  cardLikeButton.addEventListener('click', likeCardFunction);
  cardImage.addEventListener('click', clickCardFunction);
  return cardElement
}

export {deleteCard, likeCard, createCard, initialCards};