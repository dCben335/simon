import { PlayerBoardScore } from "./types";

const scoreBoardCtr = document.querySelector(
  ".scoreboard > div"
) as HTMLDivElement;

const templateScore = (
  { gamertag, score }: PlayerBoardScore,
  index: number
): string => `
  <div class="scoreboardRow" >
      <span class="rank">#${index + 1}</span>
      <span class="gamertag">${gamertag}</span>
      <span class="score">${score}</span>
  </div>
`;

const templateScoreHead: string = `
  <div class="scoreboardHead">
    <span>RANK</span>
    <span>GAMERTAG</span>
    <span>BEST SCORE</span>
  </div>
`;
(function showScoreBoard() {
  const scoreboard: PlayerBoardScore[] = JSON.parse(
    localStorage.getItem("scoreboard") || "[]"
  );

  if (scoreboard.length > 0) {
    scoreBoardCtr.innerHTML = templateScoreHead;
    scoreboard
      .sort((a, b) => {
        return b.score - a.score;
      })
      .map(({ gamertag, score }: PlayerBoardScore, index) => {
        scoreBoardCtr.innerHTML += templateScore({ gamertag, score }, index);
      });
  }
})();