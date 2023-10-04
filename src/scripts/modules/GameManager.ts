import * as Tone from "tone";
import { GameConstructor, Player } from "./types";

const playerClasses: { [key: number]: string } = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
};

export default class GameManager {
  nbPlayers: number;
  players: Player[];
  gameSpeed: number;
  gameContainer: HTMLDivElement;

  round: number;
  activePlayers: Player[] | undefined;
  whoIsPlaying: number | undefined;
  pattern: string[];

  colorPossibilities: { [key: string]: string } = {
    red: "C4",
    yellow: "Ab4",
    green: "Eb4",
    blue: "Bb4",
  };

  constructor({
    nbPlayers,
    playersName,
    gameSpeed,
    gameContainer,
  }: GameConstructor) {
    this.nbPlayers = nbPlayers;
    this.gameSpeed = gameSpeed || 1;
    this.gameContainer = gameContainer;

    this.activePlayers;
    this.round = 1;
    this.whoIsPlaying;
    this.pattern = [];
    this.players = this.setPlayers(playersName);

    this.startGame();
  }

  setPlayers(playersName: string[]): Player[] {
    return playersName.map((playerName) => {
      return {
        name: playerName,
        score: 0,
        round: this.round || 1,
      };
    });
  }
  startGame() {
    this.setActivePlayers(this.players);
    this.generateHTML();
    // this.countdown();
    this.createPattern(5);
    console.log(this.pattern);
    this.playPattern();
  }

  generateHTML(): void {
    this.gameContainer.classList.add(`${playerClasses[this.players.length]}`);

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
                  ${
                    this.players.length === 1
                      ? `
                      <div class="game-indications">
                        <h2></h2>
                      </div>
                      `
                      : playerInfos
                  }
                </div>
                <div class="game-buttons">
                    ${Object.keys(this.colorPossibilities)
                      .map(
                        (color) =>
                          `<button data-color="${color}" style="--_button-color: var(--${color})"></button>`
                      )
                      .join("")}
                </div>
            </section>       
          </div> 
      `;
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

  clearCountdown(
    interval: ReturnType<typeof setInterval>
  ): ReturnType<typeof clearInterval> {
    return clearInterval(interval);
  }

  createPattern(nbColorCreated: number) {
    const colors = Object.keys(this.colorPossibilities) as Array<string>;
    const patternTab: Array<string> = Array(nbColorCreated)
      .fill("")
      .map(() => colors[Math.floor(Math.random() * colors.length)]);

    this.pattern = [...this.pattern, ...patternTab];
  }

  playPattern() {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();

    let index: number = 0;
    const playingNotes = setInterval(() => {
      const buttonColor = document.querySelectorAll(
        `[data-color="${this.pattern[index]}"]`
      );
      buttonColor.forEach((button) => {
        button?.classList.add("activeColor");
      });

      const note: string = this.colorPossibilities[this.pattern[index]];
      synth.triggerAttackRelease(note, "4n");
      setTimeout(() => {
        buttonColor.forEach((button) => {
          button?.classList.remove("activeColor");
        });
      }, 300);
      index++;
      if (index >= this.pattern.length) {
        clearInterval(playingNotes);
      }
      console.log("oui");
    }, 500);
  }

  setGameSpeed(speed: number): number {
    return (this.gameSpeed = speed);
  }

  setWhoIsPlayings(index: number): number {
    return (this.whoIsPlaying = index);
  }

  setActivePlayers(players: Player[]): Player[] {
    return (this.activePlayers = players);
  }

  setRound(round: number): number {
    return (this.round = round);
  }
}
