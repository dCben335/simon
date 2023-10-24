import { SubmitReturn } from "./types";

const nbPlayer = document.querySelector(".nbPlayerText") as HTMLInputElement;
const allInputCtrl = document.querySelector(
  ".allPlayerInput"
) as HTMLDivElement;

const form = document.querySelector("form") as HTMLFormElement;
const home = document.querySelector(".home") as HTMLDivElement;
const game = document.querySelector(".game-container") as HTMLDivElement;
const keyboardCtr = document.querySelector(
  ".simple-keyboard"
) as HTMLDivElement;
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

const templateInput = (id: number): string => `
  <fieldset id="player${id}">
      <label for="gamertag${id}" >Nom du joueur ${id}</label>
      <input
        class="gamertagInput"
        type="text"
        name="gamertag${id}"
        id="gamertag${id}"
        required
        placeholder="Entrez votre pseudo"
        maxlength="15"
      />
  </fieldset>
`;

function onSubmit(event: SubmitEvent): SubmitReturn {
  event.preventDefault();

  let players: string[] = Array.from(
    form.querySelectorAll('input[type="text"]')
  )
    .filter((element) => (element as HTMLInputElement)?.value !== "")
    .map((element) => (element as HTMLInputElement).value);

  let chosenMode = Array.from(form.querySelectorAll('input[type="radio"]'))
    .filter((element) => (element as HTMLInputElement)?.checked)
    .map((element) => (element as HTMLInputElement).value)
    .toString();

  if (players.length === nbPlayer.valueAsNumber) {
    home.classList.add("hidden");
    game.classList.remove("hidden");
  }

  const submit = {
    players: players.length === nbPlayer.valueAsNumber ? players : [],
    chosenMode: chosenMode,
  } as SubmitReturn;
  return submit as any;
}

const keyframes: { [key: string]: any }[] = [
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
const animationOptions: { [key: string]: number } = {
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
    fieldset.animate(keyframes, animationOptions);
  } else {
    allInputCtrl.innerHTML = "";
    for (let i = 1; i <= nbPlayer.valueAsNumber; i++) {
      allInputCtrl.innerHTML += templateInput(i);
    }
  }
}

let gamertagId = "";

function lessPlayer() {
  if (nbPlayer?.valueAsNumber && nbPlayer?.valueAsNumber > 1) {
    nbPlayer.valueAsNumber--;
    setPlayer(false);
  }
  const inputGamertag = document.querySelectorAll(
    ".gamertagInput"
  ) as NodeListOf<HTMLInputElement>;
  inputGamertag.forEach((element) => {
    element.addEventListener("focus", (event) => {
      gamertagId = event.target.id;

      keyboardCtr.style.display = "block";
    });
  });
}

function morePlayer() {
  if (nbPlayer?.valueAsNumber && nbPlayer?.valueAsNumber < 4) {
    nbPlayer.valueAsNumber++;
    setPlayer(true);
  }
  const inputGamertag = document.querySelectorAll(
    ".gamertagInput"
  ) as NodeListOf<HTMLInputElement>;
  inputGamertag.forEach((element) => {
    element.addEventListener("focus", (event) => {
      gamertagId = event.target.id;

      keyboardCtr.style.display = "block";
    });
  });
}

const keyboard = new Keyboard({
  theme: "hg-theme-default",
  display: {
    "{bksp}": "\u21e6 Retour",
    "{enter}": "\u21b2 Rechercher",
    "{space}": "	____",
    "{lock}": "🔒",
    "{shift}": "⇧",
    "{tab}": "⇥",
  },
  onChange: (input) => onChange(input),
  onKeyPress: (button) => onKeyPress(button),
});

function onChange(input: string) {
  console.log(gamertagId);

  (document.getElementById(gamertagId) as HTMLInputElement).value = input;
  console.log("Input changed", input);
}

function onKeyPress(button: any) {
  console.log("Button pressed", button);
  if (button === "{enter}") keyboardCtr.style.display = "none";
}

export { lessPlayer, morePlayer, onSubmit, form };
