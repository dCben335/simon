type PlayerBoardScore = {
  rank: number;
  gamertag: string;
  score: number;
};

type GameConstructor = {
  nbPlayers: number;
  players: string[];
  gameSpeed: number;
  gameContainer: HTMLDivElement;
};

export type { PlayerBoardScore, GameConstructor };
