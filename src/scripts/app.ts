import { lessPlayer, morePlayer, onSubmit, form } from "./modules/home.ts";
import { SubmitReturn } from "./modules/types.ts";
import * as ScoreBaord from "./modules/scoreboard.ts";
import { startGame } from "./modules/startGame.ts";
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

ScoreBaord;
// # HOME

const lessButton = document.querySelector(".lessPlayer") as HTMLButtonElement;
const moreButton = document.querySelector(".morePlayer") as HTMLButtonElement;
// const inputGamertag = document.querySelector(
//   ".gamertagInput"
// ) as HTMLInputElement;
// const keyboardCtr = document.querySelector(
//   ".simple-keyboard"
// ) as HTMLDivElement;

lessButton?.addEventListener("pointerdown", () => lessPlayer());

moreButton?.addEventListener("pointerdown", () => morePlayer());

//  # GAME
form?.addEventListener("submit", (event) => {
  const { players, chosenMode } = onSubmit(event) as SubmitReturn;
  startGame(players, chosenMode);
});

// // # KEYBOARD
// inputGamertag.forEach((element) => {
//   element.addEventListener("focus", (event) => {
//     gamertagId = event.target.id;

//     keyboardCtr.style.display = "block";
//   });
// });

// const keyboard = new Keyboard({
//   theme: "hg-theme-default",
//   display: {
//     "{bksp}": "\u21e6 Retour",
//     "{enter}": "\u21b2 Rechercher",
//     "{space}": "	____",
//     "{lock}": "🔒",
//     "{shift}": "⇧",
//     "{tab}": "⇥",
//   },
//   onChange: (input) => onChange(input),
//   onKeyPress: (button) => onKeyPress(button),
// });

// function onChange(input: string) {
//   (document.getElementById(gamertagId) as HTMLInputElement).value = input;
//   console.log("Input changed", input);
// }

// function onKeyPress(button: any) {
//   console.log("Button pressed", button);
//   if (button === "{enter}") keyboardCtr.style.display = "none";
// }
