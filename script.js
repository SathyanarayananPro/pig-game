'use strict';
// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const rollEl = document.querySelector('.btn--roll');
const holdEl = document.querySelector('.btn--hold');
const newEl = document.querySelector('.btn--new');
// Starting Condition
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
const reset = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.hidden = true;
};
reset();
newEl.addEventListener('click', function () {
  reset();
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active', 'player--winner');
  player0El.classList.remove('player--winner');
  rollEl.hidden = false;

  holdEl.hidden = false;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
});
const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling dice function
rollEl.addEventListener('click', function () {
  if (playing) {
    // generate random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice number
    diceEl.hidden = false;
    diceEl.src = `dice-${dice}.png`;
    // check for 1
    if (dice !== 1) {
      // add current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // go to next player
    else {
      switchplayer();
    }
  }
});

holdEl.addEventListener('click', function () {
  if (playing) {
    // add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player score is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.hidden = true;

      rollEl.hidden = true;

      holdEl.hidden = true;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      alert(`Player ${activePlayer + 1} Won`);
    } else {
      // switch to next player
      switchplayer();
    }
  }
});
