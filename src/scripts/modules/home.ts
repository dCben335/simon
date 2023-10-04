import { PlayerBoardScore } from "./types";

// Récupération des éléments
const nbPlayer = document.querySelector(
  ".nbPlayerText"
) as HTMLInputElement | null;
const allInputCtrl = document.querySelector(
  ".allPlayerInput"
) as HTMLDivElement | null;
const scoreBoardCtr = document.querySelector(
  ".scoreboard > section"
) as HTMLDivElement;
const form = document.querySelector("form") as HTMLFormElement;
const home = document.querySelector(".home") as HTMLDivElement;

const templateInput = (id: number): string => `
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

const templateScore = ({ rank, gamertag, score }: PlayerBoardScore): string => `
  <div class="scoreboardRow" >
      <span class="rank">#${rank}</span>
      <span class="gamertag">${gamertag}</span>
      <span class="score">${score}</span>
  </div>
`;

const templateScoreHead: string = `
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
  {
    opacity: 1,
    transform: "translateY(0)",
  },
];

// Configuration de l'animation
const options = {
  duration: 500,
  iterations: 1,
};

function setPlayer(add: boolean) {
  if (!allInputCtrl || !nbPlayer) return;
  if (add) {
    allInputCtrl.innerHTML += templateInput(nbPlayer.valueAsNumber);
    const fieldset = allInputCtrl.querySelector(
      `#player${nbPlayer?.valueAsNumber}`
    ) as HTMLInputElement;

    // Lancement de l'animation
    fieldset.animate(keyframes, options);
  } else {
    allInputCtrl.innerHTML = "";
    for (let i = 1; i <= nbPlayer.valueAsNumber; i++) {
      allInputCtrl.innerHTML += templateInput(i);
    }
  }
}

function lessPlayer() {
  if (nbPlayer?.valueAsNumber && nbPlayer?.valueAsNumber > 1) {
    nbPlayer.valueAsNumber--;
    setPlayer(false);
  }
}

function morePlayer() {
  if (nbPlayer?.valueAsNumber && nbPlayer?.valueAsNumber < 4) {
    nbPlayer.valueAsNumber++;
    setPlayer(true);
  }
}

(function showScoreBoard() {
  const scoreboard: PlayerBoardScore[] = JSON.parse(
    localStorage.getItem("scoreboard") || ""
  );

  if (scoreboard.length > 0) {
    scoreBoardCtr.innerHTML = templateScoreHead;

    for (const { rank, gamertag, score } of scoreboard) {
      scoreBoardCtr.innerHTML += templateScore({ rank, gamertag, score });
    }
  }
})();

function onSubmit(event: SubmitEvent) {
  event.preventDefault();
  let players: string[] = Array.from(
    form.querySelectorAll("input[type='text']")
  )
    .filter((element) => (element as HTMLInputElement).value !== "")
    .map((element) => (element as HTMLInputElement).value);

  home.classList.add("hidden");
  return players;
}

// localStorage.setItem("scoreboard", JSON.stringify([
//   {
//     rank: 1,
//     gamertag: "Player 1",
//     score: 100
//   },
//   {
//     rank: 2,
//     gamertag: "Player 2",
//     score: 50
//   },
//   {
//     rank: 3,
//     gamertag: "Player 3",
//     score: 30
//   },
//   {
//     rank: 4,
//     gamertag: "Player 1",
//     score: 10
//   },
//   {
//     rank: 5,
//     gamertag: "Player 2",
//     score: 5
//   },
//   {
//     rank: 6,
//     gamertag: "Player 3",
//     score: 3
//   }
// ]))

export { lessPlayer, morePlayer, onSubmit, form };
