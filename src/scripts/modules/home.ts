const nbPlayer = document.querySelector(".nbPlayerText");
const allInputCtrl = document.querySelector(".allPlayerInput");
const scoreBoardCtr = document.querySelector(".scoreboard>section");

const templateInput = (id) => `
<fieldset id="player${id}">
    <label for="gamertag${id}" >Nom du joueur ${id}</label>
    <input
    type="text"
    name="gamertag${id}"
    id="gamertag${id}"
    required
    placeholder="Entrez votre pseudo"
    maxlength="15"
    />
</fieldset>
`;

const templateScore = (rank, gamertag, score) => `
  <div class="scoreboardRow" >
      <span class="rank">#${rank}</span>
      <span class="gamertag">${gamertag}</span>
      <span class="score">${score}</span>
  </div>
`;

const templateScoreHead = `
<div class="scoreboardHead">
  <span>RANK</span>
  <span>GAMERTAG</span>
  <span>BEST SCORE</span>
</div>
`;

// Création du keyframe
const keyframes = [
  {
    opacity: 0,
    transform: "translateY(50px)",
  },
  { opacity: 1, transform: "translateY(0)" },
];

// Configuration de l'animation
const options = {
  duration: 500,
  iterations: 1,
};

function setPlayer(add) {
  if (add) {
    allInputCtrl.innerHTML += templateInput(nbPlayer?.value);
    const fieldset = document.querySelector(`#player${nbPlayer?.value}`);
    // Lancement de l'animation
    fieldset.animate(keyframes, options);
  } else {
    allInputCtrl.innerHTML = "";
    for (let i = 1; i <= nbPlayer.value; i++) {
      allInputCtrl.innerHTML += templateInput(i);
    }
  }
}

function lessPlayer() {
  if (nbPlayer.value > 1) {
    nbPlayer.value--;
    setPlayer(false);
  }
}

function morePlayer() {
  if (nbPlayer.value < 4) {
    nbPlayer.value++;
    setPlayer(true);
  }
}

function showScoreBoard() {
  const scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
  if (scoreboard.length > 0) {
    scoreBoardCtr.innerHTML = templateScoreHead;
    for (const { rank, gamertag, score } of scoreboard) {
      scoreBoardCtr.innerHTML += templateScore(rank, gamertag, score);
    }
  }
}


localStorage.setItem("scoreboard", JSON.stringify([
  {
    rank: 1,
    gamertag: "Player 1",
    score: 100
  },
  {
    rank: 2,
    gamertag: "Player 2",
    score: 50
  },
  {
    rank: 3,
    gamertag: "Player 3",
    score: 30
  },
  {
    rank: 4,
    gamertag: "Player 1",
    score: 10
  },
  {
    rank: 5,
    gamertag: "Player 2",
    score: 5
  },
  {
    rank: 6,
    gamertag: "Player 3",
    score: 3
  }
]))

export { lessPlayer, morePlayer, showScoreBoard };
