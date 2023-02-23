'use stirct';
const moviesObject = {
  '👑🦁🌅': 'The Lion King',
  '🔍🐟': 'Finding Nemo',
  '👻🎹😇' : 'Soul',
  '🐊🤠🎮': 'Crocodile Dundee',
  '🦇👨‍⚖️' : 'Batman',
  '👰🏻❤️👹🥀🤴🏻' : 'Beauty and the Beast',
  '🤡🕷' : 'IT',
  '🕷🧑🏻' : 'Spider-Man',
  '👦🏻🏠🆘' : 'Home Alone',
  '🏹👩🏻🍕' : 'The Hunger Games',
  '🧙🏻‍♀️⚡️💀': 'Harry Potter',
  '🏠🎈🎈':'UP',
  '🐒🧞‍♂️✨':'Aladdin',
  '🐭🍳👨🏼‍🍳':'Ratatoullie',
  '👊🏻💥🐼':'Kung Fu Panda',
  '👸🏻💤💤':'Sleeping Beauty',
  '🐢🐭🍕':'Teenage Mutant Ninja Tuertles',
  '🐻👀💤':'Manuhi',
  '👨🏻😡🔋':'The Incredible Hulk',
  '🐅🌳📖':'The Jungle Book',
  '🤠👨🏼‍🚀🦖':'Toy Story',
};

const container = document.querySelector('.container');
const controls = document.querySelector('.controlsContainer');
const startButton = document.getElementById('start');
const letterContainer = document.getElementById('letterContainer');
const userInputSection = document.getElementById('userInputSection');
const resultText = document.getElementById('result');
const hints = Object.keys(moviesObject);
let randomHint = '',
  randomWord = '';
let winCount = 0,
  lossCount = 5;

const generateRandomValue = array => Math.floor(Math.random() * array.length);

//Blocker

const blocker = () => {
  let letterButtons = document.querySelectorAll('.letters');
  letterButtons.forEach(button => {
    button.disabled = true;
  });
  stopGame();
};

//start game
startButton.addEventListener('click', () => {
  //Controls and burrons visibility
  controls.classList.add('hide');
  init();
});

//stop game
const stopGame = () => {
  controls.classList.remove('hide');
};
//Generate Word
const generateWord = () => {
  letterContainer.classList.remove('hide');
  userInputSection.innerText = '';
  randomHint = hints[generateRandomValue(hints)];
  randomWord = moviesObject[randomHint];
  container.innerHTML = `<div id="movieHint">${randomHint}</div>`;
  let displayItem = '';
  randomWord.split('').forEach(value => {
    if (value === ' ') {
      winCount += 1;
      displayItem += `<span class="inputSpace">&nbsp;</span>`;
    } else {
      displayItem += `<span class="inputSpace">-</span>`;
    }
  });
  userInputSection.innerHTML = displayItem;
};
//Initial Function
const init = () => {
  winCount = 0;
  lossCount = 5;
  document.getElementById(
    'chanceCount'
  ).innerHTML = `<span> Tries Left : </span>${lossCount}`;
  randomHint = null;
  randomWord = '';
  userInputSection.innerHTML = '';
  letterContainer.classList.add('hide');
  letterContainer.innerHTML = '';
  generateWord();
  for (let i = 65; i < 91; i++) {
    let button = document.createElement('button');
    button.classList.add('letters');
    //Num to ASCII [A - Z];
    button.innerText = String.fromCharCode(i);
    //Character button click
    button.addEventListener('click', () => {
      let charArray = randomWord.toUpperCase().split('');
      let inputSpace = document.getElementsByClassName('inputSpace');
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            button.classList.add('used');
            inputSpace[index].innerText = char;
            winCount += 1;
            if (winCount === charArray.length) {
              resultText.innerHTML = 'You Won!!!💥';
              blocker();
            }
          }
        });
      } else {
        lossCount -= 1;
        document.getElementById(
          'chanceCount'
        ).innerHTML = `<span>Tries Left:</span>${lossCount}`;
        button.classList.add('used');
        if (lossCount === 0) {
          resultText.innerHTML = 'You loser!!! 😆';
          blocker();
        }
        button.disabled = true;
      }
    });
    letterContainer.appendChild(button);
  }
};
window.onload = () => {
  init();
};
