type PlayerBoardScore = {
  gamertag: string;
  score: number;
};

type GameConstructor = {
  nbPlayers: number;
  playersName: string[];
  gameSpeed: number;
  minSpeed: number;
  multiplicator: number;
  patternsLevel: { [key: number]: number };
  gameContainer: HTMLDivElement;
  numberOfButtons: number
};

type Player = {
  gamertag: string;
  score: number;
  round: number;
};

type SubmitReturn = {
  players: string[];
  chosenMode: string;
};

export type { PlayerBoardScore, GameConstructor, Player, SubmitReturn };
