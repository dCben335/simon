export default class GameManager {
  constructor(
    nbPlayers,
    players,
    round = 1,
    activePlayers,
    whoIsPlaying,
    gameSpeed = 1
  ) {
    this.nbPlayers = nbPlayers;
    this.players = players;
    this.round = round;
    this.activePlayers = activePlayers;
    this.whoIsPlaying = whoIsPlaying;
    this.gameSpeed = gameSpeed;
  }
}
