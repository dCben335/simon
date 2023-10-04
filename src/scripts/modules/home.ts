const nbPlayer = document.querySelector(".nbPlayerText") as HTMLInputElement;
const allInputCtrl = document.querySelector(
  ".allPlayerInput"
) as HTMLDivElement;

const form = document.querySelector("form") as HTMLFormElement;
const home = document.querySelector(".home") as HTMLDivElement;
const game = document.querySelector(".game-container") as HTMLDivElement;

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

function onSubmit(event: SubmitEvent): string[] | false {
  event.preventDefault();

  let players: string[] = Array.from(
    form.querySelectorAll('input[type="text"]')
  )
    .filter((element) => (element as HTMLInputElement)?.value !== "")
    .map((element) => (element as HTMLInputElement)?.value);

  if (players.length === nbPlayer.valueAsNumber) {
    home.classList.add("hidden");
    game.classList.remove("hidden");
  }

  return players.length === nbPlayer.valueAsNumber ? players : false;
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

export { lessPlayer, morePlayer, onSubmit, form };
