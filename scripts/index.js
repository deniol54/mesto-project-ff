// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardsContainer = document.querySelector('.places__list');
function deleteCard(event) {
  event.target.parentElement.remove();
}

function createCard(cardName, cardImgLink, deleteCardFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__image').src = cardImgLink;
  cardDeleteButton.addEventListener('click', deleteCardFunction);
  return cardElement
}

for(let i = 0; i<initialCards.length; i++) {
  cardsContainer.append(createCard(initialCards[i].name, initialCards[i].link, deleteCard));
}

