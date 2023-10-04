import { gameConstructor } from "./types";

export default class GameManager {
  nbPlayers: number;
  players: string[];
  round: number;
  activePlayers: string[];
  whoIsPlaying: string;
  gameSpeed: number;

  constructor(gameConstructor: gameConstructor) {
    this.nbPlayers = gameConstructor.nbPlayers;
    this.players = gameConstructor.players;
    this.round = gameConstructor.round;
    this.activePlayers = gameConstructor.activePlayers;
    this.whoIsPlaying = gameConstructor.whoIsPlaying;
    this.gameSpeed = gameConstructor.gameSpeed;
  }
}
