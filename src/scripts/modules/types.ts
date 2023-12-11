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
  patternsLevel: { 
    [key: number]: number 
  };
  gameContainer: HTMLDivElement;
  numberOfButtons: number
};

type Player = {
  gamertag: string;
  score: number;
  round: number;
};

type GameDifficulty = "easy" | "normal" | "difficult" | "hard";

type SubmitReturn = {
  players: string[];
  chosenMode: GameDifficulty;
}

export type { 
  PlayerBoardScore, 
  GameConstructor, 
  Player, 
  SubmitReturn,
  GameDifficulty,
};
