import GameManager from "./GameManager";
import { GameConstructor } from "./types";

const retry = document.querySelector(".retry") as HTMLDivElement;

const templateScoreHead: string = `
  <div class="scoreboardHead">
    <span>RANK</span>
    <span>GAMERTAG</span>
    <span>SCORE</span>
    <span>ROUND</span>
  </div>
`;

function showPartyRecap(players: any) {
  const templateModal = `
    <div class="animated-rgb modal">
    <div>
    <div class="modal-content scoreboard" >

    <h3>Fin de partie</h3>
    <div>
    ${templateScoreHead}
    ${
      Array.isArray(players)
        ? players
            .sort((a, b) => {
              return b.score - a.score;
            })
            .map(
              ({ gamertag, score, round }: any, index) => `
              <div class="scoreboardRow" >
              <span class="rank">#${index + 1}</span>
              <span class="gamertag">${gamertag}</span>
              <span class="score">${score}</span>
              <span class="round">${round}</span>
          </div>
    `
            )
            .join("")
        : "<p>Aucun joueur</p>"
    }
    </div>
    <div class="retryButtons" >
    <button class="returnToMenu" >Menu</button>
    <button class="retryButton" >Réessayer</button>
    </div>
    </div>
    </div>
    </div>
    `;
  retry.innerHTML = templateModal;
  const returnToMenuButton: HTMLButtonElement | null =
    document.querySelector(".returnToMenu");
  const retryButton: HTMLButtonElement | null =
    document.querySelector(".retryButton");

  returnToMenuButton?.addEventListener("click", () => {
    window.location.reload();
  });

  retryButton?.addEventListener("click", () => {
    const gameContainer = document.querySelector(
      ".game-container"
    ) as HTMLDivElement;
    if (!gameContainer) window.alert("Game container not found");
    gameContainer.innerHTML = "";
    if (players) {
      const playersName = players.map(({ gamertag }: any) => gamertag);
      const gameOptions: GameConstructor = {
        nbPlayers: playersName.length,
        playersName: playersName,
        gameContainer: gameContainer,
      };
      retry.classList.add("hidden");
      const game = new GameManager(gameOptions);
    }
  });
}

// console.log(returnToMenuButton);

export { showPartyRecap };
