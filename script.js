const menu = document.getElementById('content');
const fieldCards = document.getElementById('game');
const startButton = document.getElementById('gameStart');
const easyButton = document.getElementById('easy');
const mediumButton = document.getElementById('medium');
const hardButton = document.getElementById('hard');
let renderedCards = [];
let level = 1;
let bugCard = 0;

class Card {
  renderCard(isBug) {
    const card = document.createElement('div');
    card.classList.add('card');
    if (isBug) {
      card.innerHTML = `
        <img class="card__back" src="./images/Перевернутая карта.png">
        <img class="card__front" src="./images/bugCard.png">
      `;
    } else {
      card.innerHTML = `
        <img class="card__front" src="./images/emptyCard.png">
        <img class="card__back" src="./images/Перевернутая карта.png">
      `;
    };
    fieldCards.append(card);
  };

  generateCards(cards, lvl) {
    bugCard = Math.floor(Math.random() * cards);
    for (let i = 0; i < cards; i++) {
      if (i === bugCard) {
        this.renderCard(true);
      } else {
        this.renderCard(false);
      };
    }
    fieldCards.className = `easy-game ${lvl}`;
  };

  renderCards(level) {
    switch (level) {
      case 1 :
        this.generateCards(3, 'easy-game');
        break;

      case 2 :
        this.generateCards(6, 'medium-game');
        break;

      case 3 :
        this.generateCards(10, 'hard-game');
        break;
    }
  };
};

const cards = new Card();

const goMenu = function () {
  fieldCards.innerHTML = '';
  fieldCards.className = '';
  document.body.classList.remove('field');
  menu.classList.remove('hidden');
};

easyButton.addEventListener('click', () => {
  level = 1;
  easyButton.classList.add('selected');
  mediumButton.classList.remove('selected');
  hardButton.classList.remove('selected');
});
mediumButton.addEventListener('click', () => {
  level = 2;
  mediumButton.classList.add('selected');
  easyButton.classList.remove('selected');
  hardButton.classList.remove('selected');
});
hardButton.addEventListener('click', () => {
  level = 3;
  hardButton.classList.add('selected');
  easyButton.classList.remove('selected');
  mediumButton.classList.remove('selected');
});

startButton.addEventListener('click', () => {
  fieldCards.removeEventListener('click', goMenu);
  menu.classList.add('hidden');
  document.body.classList.add('field');
  cards.renderCards(level);
  renderedCards = document.querySelectorAll('.card');
  for (let i = 2; i < renderedCards.length; i++) {
    renderedCards[i].addEventListener('click', function() {
      renderedCards[i].classList.add('rotate');
      setTimeout(function() {
        fieldCards.addEventListener('click', goMenu, {once: true});
      }, 400);
    });
  };
});