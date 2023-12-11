import { GameConstructor } from "./types";
import GameManager from "./GameManager";
import { GameDifficulty } from "./types";

const tabSpeed: { [key: string]: number } = {
  easy: 950,
  normal: 650,
  difficult: 450,
  hard: 350,
};

const tabMultiplicator: { [key: string]: number } = {
  easy: 1,
  normal: 2,
  difficult: 5,
  hard: 15,
};

const tabSpeedMin: { [key: string]: number } = {
  easy: 650,
  normal: 450,
  difficult: 350,
  hard: 250,
};

const patternToCreate: { [key: string]: { [key: number]: number } } = {
  easy: { 0: 1, 5: 1, 10: 2, 20: 2 },
  normal: { 0: 1, 5: 2, 10: 2, 20: 3 },
  difficult: { 0: 2, 5: 2, 10: 3, 20: 4 },
  hard: { 0: 2, 5: 3, 10: 4, 20: 5 },
};

const tabNbButtons: { [key: string]: number } = {
  easy: 2,
  normal: 4,
  difficult: 6,
  hard: 8,
}

const gameContainer = document.querySelector("#game-container") as HTMLDivElement;

function startGame(playersName: string[], chosenMode: GameDifficulty) {
  if (!gameContainer) window.alert("Game container not found");
  if (!playersName) window.alert("No players name");
  if (!chosenMode) window.alert("No chosen mode");
  
  gameContainer.innerHTML = "";
  gameContainer.className = "";

  if (playersName) {
    const gameOptions: GameConstructor = {
      nbPlayers: playersName.length,
      playersName: playersName,
      gameContainer: gameContainer,
      numberOfButtons: tabNbButtons[chosenMode],
      gameSpeed: tabSpeed[chosenMode],
      minSpeed: tabSpeedMin[chosenMode],
      patternsLevel: patternToCreate[chosenMode],
      multiplicator: tabMultiplicator[chosenMode],
    };

    const game = new GameManager(gameOptions);
  }
}

export { startGame };
