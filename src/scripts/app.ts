import { lessPlayer, morePlayer, onSubmit, form } from "./modules/home.ts";
import GameManager from "./modules/GameManager.ts";
import { GameConstructor } from "./modules/types.ts";

// # HOME

const lessButton: HTMLButtonElement | null =
  document.querySelector(".lessPlayer");
const moreButton: HTMLButtonElement | null =
  document.querySelector(".morePlayer");
const gameIndicationsContainer: HTMLDivElement | null =
  document.querySelector(".game-container");

lessButton?.addEventListener("click", () => lessPlayer());

moreButton?.addEventListener("click", () => morePlayer());

form?.addEventListener("submit", (event) => {
  const players = onSubmit(event);
  console.log(players);

  if (gameIndicationsContainer && players) {
    const gameOptions: GameConstructor = {
      nbPlayers: players.length,
      players: players,
      gameSpeed: 1,
      gameContainer: gameIndicationsContainer,
    };
    const Game = new GameManager(gameOptions);
  }
});

//  # GAME
