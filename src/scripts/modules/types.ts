type PlayerBoardScore = {
  rank: number;
  gamertag: string;
  score: number;
};

type GameConstructor = {
  nbPlayers: number;
  playersName: string[];
  gameSpeed: number;
  gameContainer: HTMLDivElement;
};

type Player = {
  name: string;
  score: number;
  round: number;
};

export type { PlayerBoardScore, GameConstructor, Player };
