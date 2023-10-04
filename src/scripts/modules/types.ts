type PlayerBoardScore = {
    rank : number
    gamertag: string
    score: number
}

type gameConstructor = {
    nbPlayers: number;
    players: string[];
    gameSpeed: number;
};

export type {
    PlayerBoardScore,
    gameConstructor,
}