import * as Tone from "tone";
import { lessPlayer, morePlayer, showScoreBoard } from "./modules/home.ts";

// # HOME

const lessButton: HTMLButtonElement | null =
  document.querySelector(".lessPlayer");
const moreButton: HTMLButtonElement | null =
  document.querySelector(".morePlayer");

lessButton?.addEventListener("click", () => lessPlayer());

moreButton?.addEventListener("click", () => morePlayer());

//  # GAME
