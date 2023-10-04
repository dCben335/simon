import * as Tone from "tone";
import { GameConstructor } from "./types";

const playerClasses: { [key: number]: string } = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
};

export default class GameManager {
  nbPlayers: number;
  players: string[];
  gameSpeed: number;
  gameContainer: HTMLDivElement;

  round: number;
  activePlayers: string[] | undefined;
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
    players,
    gameSpeed,
    gameContainer,
  }: GameConstructor) {
    this.nbPlayers = nbPlayers;
    this.players = players;
    this.gameSpeed = gameSpeed || 1;
    this.gameContainer = gameContainer;

    this.activePlayers;
    this.whoIsPlaying;
    this.round = 4;
    this.pattern = [];

    this.startGame();
  }

  startGame() {
    this.setActivePlayers(this.players);
    this.generateHTML();

    // this.countdown();
    this.createPattern(5);
    console.log(this.pattern);
    this.playPattern();
  }

  generateHTML() {
    this.gameContainer.classList.add(`${playerClasses[this.players.length]}`);

    this.players.forEach((element: string, index: number) => {
      this.gameContainer.innerHTML += `
          <div class="game ${index}">
            <section class="game-infos">
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
            </section>
            <section class="game-board">
                <div class="game-indications">
                    <div>

                    </div>
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

  countdown() {
    let counter: number = 3;

    const countdownInterval = setInterval(() => {
      this.gameContainer.innerHTML =
        counter > 0 ? `<h2>${counter}</h2>` : "C'est parti !";

      if (counter === -2) {
        this.gameContainer.innerHTML = "";
        this.clearCountdown(countdownInterval);
      }
      this.colorPossibilities["red"];

      counter--;
    }, 1000);
  }

  clearCountdown(interval: ReturnType<typeof setInterval>) {
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
      const buttonColor = document.querySelector(
        `[data-color="${this.pattern[index]}"]`
      );
      buttonColor?.classList.add("activeColor");
      const note: string = this.colorPossibilities[this.pattern[index]];
      synth.triggerAttackRelease(note, "4n");
      setTimeout(() => {
        buttonColor?.classList.remove("activeColor");
      }, 300);
      index++;
      if (index >= this.pattern.length) {
        clearInterval(playingNotes);
      }
      console.log("oui");
    }, 500);
  }

  setGameSpeed(speed: number) {
    return (this.gameSpeed = speed);
  }

  setWhoIsPlayings(index: number) {
    return (this.whoIsPlaying = index);
  }

  setActivePlayers(playersName: string[]) {
    return (this.activePlayers = playersName);
  }

  setRound(round: number) {
    return (this.round = round);
  }
}
