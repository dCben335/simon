import { lessPlayer, morePlayer, onSubmit, form } from "./modules/home.ts";
import { SubmitReturn } from "./modules/types.ts";
import * as ScoreBaord from "./modules/scoreboard.ts";
import { startGame } from "./modules/startGame.ts";

ScoreBaord;

const lessButton = document.querySelector(".lessPlayer") as HTMLButtonElement;
const moreButton = document.querySelector(".morePlayer") as HTMLButtonElement;

lessButton?.addEventListener("pointerdown", () => lessPlayer());
moreButton?.addEventListener("pointerdown", () => morePlayer());

//  # GAME
form?.addEventListener("submit", (event) => {
  const { players, chosenMode } = onSubmit(event) as SubmitReturn;
  startGame(players, chosenMode);
});
