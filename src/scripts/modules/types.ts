type PlayerBoardScore = {
    rank : number
    gamertag: string
    score: number
}

type gameConstructor = {
    nbPlayers: number;
    players: string[];
    round: number;
    activePlayers: string[];
    whoIsPlaying: string;
    gameSpeed: number;
  };

export type {
    PlayerBoardScore,
    gameConstructor,
}