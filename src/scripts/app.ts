import { lessPlayer, morePlayer, onSubmit, form } from "./modules/home.ts";
import { GameConstructor } from "./modules/types.ts";
import * as ScoreBaord from "./modules/scoreboard.ts";
import { restartGame } from "./modules/retrymodal.ts";

ScoreBaord;
// # HOME

const lessButton = document.querySelector(".lessPlayer") as HTMLButtonElement;
const moreButton = document.querySelector(".morePlayer") as HTMLButtonElement;


lessButton?.addEventListener("click", () => lessPlayer());

moreButton?.addEventListener("click", () => morePlayer());

//  # GAME
form?.addEventListener("submit", (event) => {
  const players = onSubmit(event) as string[];
  restartGame(players)
});

