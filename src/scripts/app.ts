import GameManager from "./modules/GameManager.ts";
import { lessPlayer, morePlayer, onSubmit, form } from "./modules/home.ts";
import { GameConstructor } from "./modules/types.ts";
import * as ScoreBaord from "./modules/scoreboard.ts";
import { showPartyRecap } from "./modules/retrymodal.ts";

ScoreBaord;
// # HOME

const lessButton: HTMLButtonElement | null =
  document.querySelector(".lessPlayer");
const moreButton: HTMLButtonElement | null =
  document.querySelector(".morePlayer");

lessButton?.addEventListener("click", () => lessPlayer());

moreButton?.addEventListener("click", () => morePlayer());

//  # GAME
let players;
form?.addEventListener("submit", (event) => {
  const gameContainer: HTMLDivElement | null =
    document.querySelector(".game-container");
  if (!gameContainer) return;

  players = onSubmit(event);
  if (players) {
    const gameOptions: GameConstructor = {
      nbPlayers: players.length,
      playersName: players,
      gameContainer: gameContainer,
    };

    const game = new GameManager(gameOptions);
  }
});

showPartyRecap([
  {
    gamertag: "Player One",
    score: 100,
    round: 1,
  },
  {
    gamertag: "Player 2",
    score: 50,
    round: 1,
  },
  {
    gamertag: "Player 3",
    score: 30,
    round: 1,
  },
]);
