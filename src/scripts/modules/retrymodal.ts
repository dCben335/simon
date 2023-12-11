import { startGame } from "./startGame";
import { Player, GameDifficulty } from "./types";

const retry = document.querySelector(".retry") as HTMLDivElement;

const templateScoreHead: string = `
  <div class="scoreboardHead">
    <span>RANK</span>
    <span>GAMERTAG</span>
    <span>SCORE</span>
    <span>ROUND</span>
  </div>
`;

function showPartyRecap(players: Player[], multiplicator: number) {
  retry.innerHTML = `
    <aside class="animated-rgb modal">
      <div>
       <div class="modal-content scoreboard" >
        <h3>Fin de partie</h3>
        <div>
          ${templateScoreHead}
          ${
            Array.isArray(players)
              ? players
                  .sort((a, b) => b.score - a.score)
                  .map(({ gamertag, score, round }: any, index) => `
                      <div class="scoreboardRow" >
                        <span class="rank">#${index + 1}</span>
                        <span class="gamertag">${gamertag}</span>
                        <span class="score">${score}</span>
                        <span class="round">${round}</span>
                      </div> 
                  `).join("")
              : "<p>Aucun joueur</p>"
          }
          </div>
          <div class="choiceDifficultyRadio">
                <input type="radio" class="radioButton" name="radioButton_decouverte" value="easy" id="decouverte_retry" ${
                  multiplicator === 1 ? "checked" : ""
                } />
                <label for="decouverte_retry">Découverte</label>

                <input type="radio" class="radioButton" name="radioButton_normal" value="normal" id="normal_retry" ${
                  multiplicator === 2 ? "checked" : ""
                } />
                <label for="normal_retry">Normal</label>

                <input type="radio" class="radioButton" name="radioButton_difficile" value="difficult" id="difficile_retry" ${
                  multiplicator === 3.5 ? "checked" : ""
                } />
                <label for="difficile_retry">Difficile</label>

                <input type="radio" class="radioButton" name="radioButton_hardcore" value="hard" id="hardcore_retry" ${
                  multiplicator === 20 ? "checked" : ""
                } />
                <label for="hardcore_retry">Hardcore</label>
            </div>
          <div class="retryButtons" >
            <button class="returnToMenu">Menu</button>
            <button class="retryButton">Réessayer</button>
          </div>
        </div>
      </div>
    </aside>
  `;

  const returnToMenuButton = document.querySelector(".returnToMenu") as HTMLButtonElement;
  const retryButton = document.querySelector(".retryButton") as HTMLButtonElement;

  returnToMenuButton?.addEventListener("pointerdown", () =>
    window.location.reload()
  );

  retryButton?.addEventListener("pointerdown", () => {
    const chosenMode = Array.from(retry.querySelectorAll('input[type="radio"]'))
      .filter((element) => (element as HTMLInputElement)?.checked)
      .map((element) => (element as HTMLInputElement).value)
      .toString() as GameDifficulty;

    const playersName = players.map(({ gamertag }: any) => gamertag);
    startGame(playersName, chosenMode);
    retry.classList.add("hidden");
  });
}

export { 
  showPartyRecap,
};
