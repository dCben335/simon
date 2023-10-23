const retry = document.querySelector(".retry") as HTMLDivElement;

function showPartyRecap(players: any) {
  const templateModal = `
    <aside class="animated-rgb modal">
      <div>
        <div class="modal-content" >
          <h3>Fin de partie</h3>
          <div>
          ${Array.isArray(players) ? players.map(({ gamertag, score, round }: any, index: number) => `
              <div class="scoreboardRow" >
                <span class="rank">#${index + 1}</span>
                <span class="gamertag">${gamertag}</span>
                <span class="score">${score}</span>
              </div>
            `).join("") : "<p>Aucun joueur</p>"
          }
          </div>
          <div>
            <button>Menu</button>
            <button>Réessayer</button>
          </div>
        </div>
      </div>
    </aside>
    `;
  retry.innerHTML = templateModal;
}

export { 
  showPartyRecap 
};
