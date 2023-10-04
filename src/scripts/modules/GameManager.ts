import * as Tone from "tone";
import { GameConstructor, Player } from "./types";

const playerClasses: {[key: number]: string} = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
} 

export default class GameManager {
  nbPlayers: number;
  players: Player[];
  gameSpeed: number;
  gameContainer: HTMLDivElement;

  round: number | undefined;
  activePlayers: Player[] | undefined;
  whoIsPlaying: number | undefined;

  colorPossibilities = {
    "red" : "C3",
    "yellow" : "C3",
    "green" : "C3",
    "blue" : "C3",
  }


  constructor({nbPlayers, playersName, gameSpeed, gameContainer}: GameConstructor) {
    this.nbPlayers = nbPlayers;
    this.gameSpeed = gameSpeed || 1;
    this.gameContainer = gameContainer;
    
    this.activePlayers;
    this.round = 1;
    this.whoIsPlaying;

    this.players = this.setPlayers(playersName);
    
    this.startGame()
  }

  setPlayers(playersName: string[]): Player[] {
    return playersName.map((playerName) => {
      return {
        name: playerName,
        score: 0,
        round: this.round || 1,
      }
    })
  }
  startGame() {
    this.setActivePlayers(this.players);
    this.generateHTML();
    // this.countdown();
  }

  generateHTML() : void {
    this.gameContainer.classList.add(`${playerClasses[this.players.length]}`)

    const playerInfos: string = `
        <div class="game-infos">
            <h2>GAME OVER</h2>
            <div>
                <article>
                    <h3>SCORE</h3>
                    <span class="score">1787</span>
                </article>
                <article>
                    <h3>ROUND</h3>
                    <span class="round">10</span>
                </article>
            </div>
        </div>
    `;

    this.players.forEach((element: Player, index: number) => {
      this.gameContainer.innerHTML += `
          <div class="game player-${playerClasses[index + 1]}">
            ${this.players.length === 1 ? playerInfos : ""}
            <section class="game-board">
                <div class="game-circle">
                  ${this.players.length === 1 ? `
                      <div class="game-indications">
                        <h2></h2>
                      </div>
                      ` : playerInfos
                    }
                </div>
                <div class="game-buttons">
                    ${Object.keys(this.colorPossibilities).map((color) => 
                        `<button data-color="${color}" style="--_button-color: var(--${color})"></button>`
                      ).join('')}
                </div>
            </section>       
          </div> 
      `
    });
  }

  // countdown() {
  //   let counter: number = 3;

  //   const countdownInterval = setInterval(() => {

  //     this.indicationsContainer.innerHTML = 
  //       counter > 0 ? `<h2>${counter}</h2>` : "C'est parti !"

  //     if ( counter === -2 ) {
  //       this.indicationsContainer.innerHTML = "";
  //       this.clearCountdown(countdownInterval);
  //     }

  //     counter--;
  //   }, 1000);
  // }

  clearCountdown(interval: ReturnType<typeof setInterval>) : ReturnType<typeof clearInterval>{
    return clearInterval(interval);
  }


  createPattern() {

  }












  setGameSpeed(speed: number): number {
    return this.gameSpeed = speed;
  }
  
  setWhoIsPlayings(index: number): number {
    return this.whoIsPlaying = index;
  }

  setActivePlayers(players : Player[]): Player[] {
    return this.activePlayers = players;
  }

  setRound(round : number): number {
    return this.round = round;
  }
}

