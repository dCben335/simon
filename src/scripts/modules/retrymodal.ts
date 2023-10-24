import GameManager from "./GameManager";
import { GameConstructor, Player } from "./types";

const gameContainer = document.querySelector(".game-container") as HTMLDivElement;
const retry = document.querySelector(".retry") as HTMLDivElement;


const templateScoreHead: string = `
  <div class="scoreboardHead">
    <span>RANK</span>
    <span>GAMERTAG</span>
    <span>SCORE</span>
    <span>ROUND</span>
  </div>
`;


function showPartyRecap(players: Player[] ) {
  retry.innerHTML  = `
    <aside class="animated-rgb modal">
      <div>
       <div class="modal-content scoreboard" >
        <h3>Fin de partie</h3>
        <div>
          ${templateScoreHead}
          ${ Array.isArray(players) ? players.sort((a, b) =>  b.score - a.score )
              .map(
                ({ gamertag, score, round }: any, index) => `
              <div class="scoreboardRow" >
                <span class="rank">#${index + 1}</span>
                <span class="gamertag">${gamertag}</span>
                <span class="score">${score}</span>
                <span class="round">${round}</span>
              </div> 
          `).join("") : "<p>Aucun joueur</p>"
          }
        </div>
        <div class="retryButtons" >
          <button class="returnToMenu" >Menu</button>
          <button class="retryButton" >Réessayer</button>
        </div>
        </div>
      </div>
    </aside>
  `;
  

  const returnToMenuButton = document.querySelector(".returnToMenu") as HTMLButtonElement;
  const retryButton = document.querySelector(".retryButton") as HTMLButtonElement

  returnToMenuButton?.addEventListener("click", () => window.location.reload());
  
  retryButton?.addEventListener("click", () => {
    const playersName = players.map(({ gamertag }: any) => gamertag);
    restartGame(playersName)
  });
}

function restartGame(playersName: string[]) {
  if (!gameContainer) window.alert("Game container not found");
  gameContainer.innerHTML = "";

  if (playersName) { 
    const gameOptions: GameConstructor = {
      nbPlayers: playersName.length,
      playersName: playersName,
      gameContainer: gameContainer,
      gameSpeed: 100,
      numberOfButtons: 8
    }
    retry.classList.add("hidden");
    const game = new GameManager(gameOptions);
  }
}

export { 
  showPartyRecap,
  restartGame
};
