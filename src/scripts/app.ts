import GameManager from "./modules/GameManager.ts";
import { lessPlayer, morePlayer, onSubmit, form } from "./modules/home.ts";
import { GameConstructor } from "./modules/types.ts";
import * as ScoreBaord from "./modules/scoreboard.ts";

ScoreBaord;
// # HOME

const lessButton = document.querySelector(".lessPlayer") as HTMLButtonElement;
const moreButton = document.querySelector(".morePlayer") as HTMLButtonElement;

lessButton?.addEventListener("click", () => lessPlayer());

moreButton?.addEventListener("click", () => morePlayer());

//  # GAME

form?.addEventListener("submit", (event) => {
  const gameContainer = document.querySelector(".game-container") as HTMLDivElement;
  if (!gameContainer) return;

  const players = onSubmit(event);
  if (players) {
    const gameOptions: GameConstructor = {
      nbPlayers: players.length,
      playersName: players,
      gameContainer: gameContainer,
    };

    const game = new GameManager(gameOptions);
  }
});
