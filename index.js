const gameBoard = document.getElementById("gameBoard");
const movesEl = document.getElementById("moves");
const timeEl = document.getElementById("time");
const restartBtn = document.getElementById("restart");

let moves = 0;
let time = 0;
let timer;
let firstCard, secondCard;
let lockBoard = false;
let matched = 0;

const icons = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🍋", "🥝"];
let cards = [...icons, ...icons].sort(() => Math.random() - 0.5);

// create cards
cards.forEach((icon) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="front">${icon}</div>
    <div class="back"></div>
  `;
  card.addEventListener("click", flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    if (moves === 0) startTimer();
    return;
  }

  secondCard = this;
  moves++;
  movesEl.textContent = moves;

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.innerHTML === secondCard.innerHTML;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matched += 2;
  resetBoard();

  if (matched === cards.length) {
    clearInterval(timer);
    setTimeout(() => alert(`🎉 You won in ${moves} moves & ${time}s!`), 500);
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 800);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startTimer() {
  timer = setInterval(() => {
    time++;
    timeEl.textContent = time;
  }, 1000);
}

restartBtn.addEventListener("click", () => location.reload());
