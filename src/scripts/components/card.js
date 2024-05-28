import { addLike, deleteLike } from './api.js';

function likeCard(evt) {
  const likes = evt.target.parentElement.querySelector('.card__like-count');
  const card = evt.target.closest('.card');
  const likeMethod = evt.target.classList.contains('card__like-button_is-active') ? deleteLike : addLike;
  likeMethod(card.id) 
    .then((res) => {
      likes.textContent = res.likes.length || ''; 
      evt.target.classList.toggle("card__like-button_is-active"); 
    })
    .catch(err => console.log(err));
}

function createCard(cardData, userId, deleteCardFunction, likeCardFunction, clickCardFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeNumber = cardElement.querySelector('.card__like-count');
  const isLiked = cardData.likes.some(user => {
    return user._id === userId;
  });
  const isOwner = cardData.owner._id === userId;
  cardLikeNumber.textContent = cardData.likes.length || '';
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeButton.addEventListener('click', likeCardFunction);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  if (!isOwner) {
    cardDeleteButton.classList.add('card__delete-button_disabled');
  }
  else {
    cardDeleteButton.addEventListener('click', deleteCardFunction);
  }
  cardImage.addEventListener('click', clickCardFunction);
  cardElement.id = cardData._id;
  return cardElement
}

export { likeCard, createCard };