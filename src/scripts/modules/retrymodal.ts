const retry = document.querySelector(".retry") as HTMLDivElement;

function showPartyRecap(players: any) {
  if (Array.isArray(players)) {
    const templateModal = `
    <div class="animated-rgb modal-content">
    <div>
    ${players
      .map(
        (player: any) => `
    <div>${player.gamertag}</div>
    `
      )
      .join("")}
    </div>
    </div>
    `;
    retry.innerHTML = templateModal;
  }
}

export { showPartyRecap };
