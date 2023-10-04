import * as Tone from "tone";
import { gameConstructor } from "./types";

export default class GameManager {
  nbPlayers: number;
  players: string[];
  gameSpeed: number;

  round: number | undefined;
  activePlayers: string[] | undefined;
  whoIsPlaying: number | undefined;

  constructor(gameConstructor: gameConstructor) {
    this.nbPlayers = gameConstructor.nbPlayers;
    this.players = gameConstructor.players;
    this.gameSpeed = gameConstructor.gameSpeed || 1;
    
    this.activePlayers;
    this.whoIsPlaying;
    this.round;

    this.startGame()
  }

  startGame() {
    this.setActivePlayers(this.players)
  }













  setGameSpeed(speed: number) {
    return this.gameSpeed = speed;
  }
  
  setWhoIsPlayings(index: number) {
    return this.whoIsPlaying = index;
  }

  setActivePlayers(playersName : string[]) {
    return this.activePlayers = playersName;
  }

  setRound(round : number) {
    return this.round = round;
  }
}

