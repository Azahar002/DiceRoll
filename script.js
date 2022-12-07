'use strict';

//below are the two ways of selecting Id's ,,,,, most common is querySelector method.

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); //El means element
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--0');
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const btn = document.querySelector('.btn');

//starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove('player--active');

  activePlayer = activePlayer === 0 ? 1 : 0;
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.add('player--active');

  //the below toggle method is an alternative to above add and remove methods
  //here this toggle method, remove's player--active class if it is present or adds it if it is absent
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice functionality
rollBtn.addEventListener('click', function () {
  if (playing) {
    //1. generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display the Generated number
    diceEl.classList.remove('hidden');
    /* manipulate src attribute */
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);
    //3. check if the num is 1 or not: if it is 1 the switch to nxt player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      // current0El.textContent = currentScore; //Change Later
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      // document.getElementById(`score--${activePlayer}`).textContent =
      //   Number(score0El.textContent) + currentScore;
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    //1. Add current score tp active player's score;
    /* holding the current score value for future use*/
    scores[activePlayer] += currentScore;

    /*using the value we held in array */
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if the player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);
