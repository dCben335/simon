import { PlayerBoardScore } from "./types";

const scoreBoardCtr = document.querySelector(".scoreboard > div") as HTMLDivElement;

const templateScore = ({rank, gamertag, score} : PlayerBoardScore) : string => `
  <div class="scoreboardRow" >
      <span class="rank">#${rank}</span>
      <span class="gamertag">${gamertag}</span>
      <span class="score">${score}</span>
  </div>
`;

const templateScoreHead : string = `
  <div class="scoreboardHead">
    <span>RANK</span>
    <span>GAMERTAG</span>
    <span>BEST SCORE</span>
  </div>
`;
(function showScoreBoard() {

    const scoreboard : PlayerBoardScore[] = JSON.parse(localStorage.getItem("scoreboard") || "");
  
    if (scoreboard.length > 0) {
      scoreBoardCtr.innerHTML = templateScoreHead;
  
      for (const { rank, gamertag, score } of scoreboard) {
        scoreBoardCtr.innerHTML += templateScore({rank, gamertag, score});
      }
    }
})()

const scoreBoardExemple: PlayerBoardScore[] = [
    {
        rank: 1,
        gamertag: "Player 1",
        score: 100
    },
    {
        rank: 2,
        gamertag: "Player 2",
        score: 50
    },
    {
        rank: 3,
        gamertag: "Player 3",
        score: 30
    },
    {
        rank: 4,
        gamertag: "Player 1",
        score: 10
    },
    {
        rank: 5,
        gamertag: "Player 2",
        score: 5
    },
    {
        rank: 6,
        gamertag: "Player 3",
        score: 3
    }
]

localStorage.setItem("scoreboard", JSON.stringify(scoreBoardExemple))