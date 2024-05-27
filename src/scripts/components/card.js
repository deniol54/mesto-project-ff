import { addLike, deleteLike } from './api.js';

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
  const likes = evt.target.parentElement.querySelector('.card__like-count');
  const card = evt.target.closest('.card');
  if (evt.target.classList.contains('card__like-button_is-active')){
    addLike(card.id)
      .then(res => {
        likes.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err); 
      });
  } 
  else {
    deleteLike(card.id)
      .then(res => {
        likes.textContent = res.likes.length > 0 ? res.likes.length : '';
      })
      .catch((err) => {
        console.log(err); 
      });
  }

}

function createCard(cardName, cardImgLink, isLiked, cardLikeCount, cardId, isOwner, deleteCardFunction, likeCardFunction, clickCardFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeNumber = cardElement.querySelector('.card__like-count');
  cardLikeNumber.textContent = cardLikeCount;
  cardElement.querySelector('.card__title').textContent = cardName;
  cardImage.src = cardImgLink;
  cardImage.alt = cardName;
  cardDeleteButton.addEventListener('click', deleteCardFunction);
  cardLikeButton.addEventListener('click', likeCardFunction);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  if (!isOwner) {
    cardDeleteButton.classList.add('card__delete-button_disabled');
  }
  cardImage.addEventListener('click', clickCardFunction);
  cardElement.id = cardId;
  return cardElement
}

export { likeCard, createCard };