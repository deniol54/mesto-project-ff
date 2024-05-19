function deleteCard(event) {
  event.target.closest('.card').remove();
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
  cardElement.querySelector('.card__image').alt = "";
  cardDeleteButton.addEventListener('click', deleteCardFunction);
  cardLikeButton.addEventListener('click', likeCardFunction);
  cardImage.addEventListener('click', clickCardFunction);
  return cardElement
}

export { deleteCard, likeCard, createCard };