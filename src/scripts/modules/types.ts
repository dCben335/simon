type PlayerBoardScore = {
  gamertag: string;
  score: number;
};

type GameConstructor = {
  nbPlayers: number;
  playersName: string[];
  gameSpeed?: number;
  gameContainer: HTMLDivElement;
};

type Player = {
  gamertag: string;
  score: number;
  round: number;
};

export type { PlayerBoardScore, GameConstructor, Player };
