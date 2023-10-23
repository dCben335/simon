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

  round: number = 0;
  activePlayers: number[] = [];
  whoIsPlaying: number = -1;
  pattern: string[] = [];
  playerCurrentMove: string[] = [];

  colorPossibilities: { [key: string]: string } = {
    red: "C4",
    yellow: "Ab4",
    green: "Eb4",
    blue: "Bb4",
  };

  constructor({ nbPlayers, playersName, gameSpeed, gameContainer }: GameConstructor) {
    this.nbPlayers = nbPlayers;
    this.gameSpeed = gameSpeed || 700;
    this.gameContainer = gameContainer;
    this.players = this.setPlayers(playersName);
    this.startGame();
  }

  startGame() {
    this.setActivePlayers(this.players);
    this.generateHTML();
    this.countdown();
    this.updateRound();


    this.gameContainer.querySelectorAll(`.player-buttons button`).forEach((button) => {
      button.addEventListener('click', () =>  this.matchingPatterns((button as HTMLButtonElement).dataset.color ?? ""));
    })
  }

  roundTransition() {
    this.disableButtons()
    this.updateRound();

    this.playerCurrentMove = [];

    setTimeout(() => {
      this.createPattern(1);
    }, 2000);
  }

  updateRound() {
    this.round++;
    this.activePlayers.forEach((player: number) => {
      const roundTag = this.gameContainer.querySelector(`.player-${playerClasses[player + 1]} .round`) as HTMLHeadingElement;
      roundTag.textContent = this.round.toString();
    })
  }
  

  setWhoIsPlayings(): void {
    if (this.whoIsPlaying === -1) {
      this.whoIsPlaying = Math.floor(Math.random() * this.activePlayers.length);
      return this.showWhoIsPlaying()
    }

    if (this.activePlayers.some((number) => number === this.whoIsPlaying)) {

      this.whoIsPlaying = this.whoIsPlaying + 1 > this.activePlayers.length -1 
        ? this.whoIsPlaying = this.activePlayers[0] 
        : this.whoIsPlaying = this.activePlayers[this.whoIsPlaying + 1]; 

    } else {

      this.whoIsPlaying = this.activePlayers[this.whoIsPlaying]
        ? this.activePlayers[this.whoIsPlaying]
        : this.whoIsPlaying = this.activePlayers[0]
    }
    
    
    this.showWhoIsPlaying()
  }

  countdown() {
    let counter: number = 3;
    const indications = this.gameContainer.querySelector('.game-indications h2') as HTMLHeadingElement

    const countdownInterval = setInterval(() => {
      indications.textContent = counter > 0 ? `${counter}` : "C'est parti !"
        
      if ( counter === -2 ) {
        indications.textContent = "";
        this.clearCountdown(countdownInterval);
        this.createPattern(1);
      }

      counter--;
    }, 1000);
  }

  createPattern(nbColorCreated: number) : void {
    const colors = Object.keys(this.colorPossibilities) as Array<string>;
    const patternTab: Array<string> = Array(nbColorCreated)
      .fill("")
      .map(() => colors[Math.floor(Math.random() * colors.length)]);

    this.pattern = [...this.pattern, ...patternTab];

    this.playPattern()
  }

  playPattern() {
    const synth = new Tone.Synth().toDestination();

    let index: number = 0;
    const playingNotes = setInterval(() => {

      const buttonColor = this.gameContainer.querySelectorAll(`[data-color="${this.pattern[index]}"]`);

      buttonColor.forEach((button) => button?.classList.add("activeColor"));

      const note: string = this.colorPossibilities[this.pattern[index]];
      synth.triggerAttackRelease(note, "4n");

      setTimeout(() => {
        buttonColor.forEach((button) => button?.classList.remove("activeColor"));
      }, 300);

      index++;

      if (index >= this.pattern.length) {
        clearInterval(playingNotes);
        this.setWhoIsPlayings();
      }
    }, 500);
  }

  matchingPatterns(color: string) {
    const synth = new Tone.Synth().toDestination();

    const note: string = this.colorPossibilities[color];
    synth.triggerAttackRelease(note, "4n");

    this.playerCurrentMove = [...this.playerCurrentMove, color];

    if (color === this.pattern[this.playerCurrentMove.length - 1]) {
      this.updateScore()

      if (this.playerCurrentMove.length === this.pattern.length) {
        this.roundTransition();
      }

    } else {
      this.removeActivePlayer() 
    }
  }

  updateScore() {
    this.players[this.whoIsPlaying].score += 5 * this.round;
    const scoreTag = this.gameContainer.querySelector('.playing .score') as HTMLHeadingElement
    scoreTag.textContent =  this.players[this.whoIsPlaying].score.toString();
  }

  removeActivePlayer() {
    const gameOverHeading = this.gameContainer.querySelector('.playing .player-infos .over') as HTMLHeadingElement
    gameOverHeading.textContent = "GAME OVER";

    this.activePlayers = this.activePlayers?.filter((player) => player !== this.whoIsPlaying);
    this.activePlayers?.length === 0 ? this.endGame() : this.roundTransition();
  }

  endGame() {
    console.log("finito")
  }



  disableButtons() {
    return this.gameContainer.querySelectorAll('.player').forEach((container) => {
      if (container.classList.contains('playing')) {
        container.classList.remove('playing');
      }
    })
  }

  enableButtonsOfPlayer(playerNumber: number) {
    const currentPlayerPlaying = this.gameContainer.querySelector(`.player-${playerClasses[playerNumber + 1]}`) as HTMLDivElement;
    currentPlayerPlaying.classList.add('playing')
  }

  clearCountdown(interval: ReturnType<typeof setInterval>): ReturnType<typeof clearInterval> {
    return clearInterval(interval);
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

  setGameSpeed(speed: number): number {
    return (this.gameSpeed = speed);
  }


  setActivePlayers(players: Player[]): number[] {
    return this.activePlayers = players.map((el, index) => index);
  }

  showWhoIsPlaying() {
    const currentPlayer = this.gameContainer.querySelector('.game-indications > h2') as HTMLHeadingElement

    currentPlayer.textContent = this.players.length === 1 
      ? `à toi de jouer ${this.players[this.whoIsPlaying].name}`
      : `à ${this.players[this.whoIsPlaying].name} de jouer`;

    this.enableButtonsOfPlayer(this.whoIsPlaying);
  }

  generateHTML(): void {
    this.gameContainer.classList.add(`${playerClasses[this.players.length]}`);

    const playerInfos: string = `
        <div class="player-infos">
            <h2 class="over"></h2>
            <div>
                <article>
                    <h3>SCORE</h3>
                    <span class="score">0</span>
                </article>
                <article>
                    <h3>ROUND</h3>
                    <span class="round">0</span>
                </article>
            </div>
        </div>
    `;

    const gamesIndications: string = `
      <div class="game-indications">
        <h2></h2>
      </div>
    `

    this.players.forEach((element: Player, index: number) => {
      this.gameContainer.innerHTML += `
          <div class="player player-${playerClasses[index + 1]}">
            ${this.players.length === 1 ? playerInfos : ""}
            <section class="player-board">
                <div class="player-circle">
                  ${ this.players.length === 1 ? gamesIndications: playerInfos }
                </div>
                <div class="player-buttons">
                    ${Object.keys(this.colorPossibilities)
                      .map( (color) =>
                          `<button data-color="${color}" style="--_button-color: var(--${color})"></button>`
                      ).join("")}
                </div>
            </section>       
          </div> 
      `;
    });

    if (this.players.length > 1) {
      this.gameContainer.innerHTML += gamesIndications;
    }
  }
}