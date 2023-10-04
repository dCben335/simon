import { lessPlayer, morePlayer, showScoreBoard } from "./modules/home.ts";

// const synth = new Tone.Synth().toDestination();

// synth.triggerAttackRelease("C4", "8n");

document.querySelectorAll(".game-board button").forEach((button, index) => {
  button.addEventListener("click", () => console.log(index));
});

// # HOME

const lessButton: HTMLButtonElement | null = document.querySelector(".lessPlayer");
const moreButton: HTMLButtonElement | null = document.querySelector(".morePlayer");

lessButton?.addEventListener("click", () => {
  lessPlayer();
});

moreButton?.addEventListener("click", () => {
  morePlayer();
});

window.addEventListener("load", () => {
  showScoreBoard();
});

//  # GAME
