import { GameState } from "./gameState.js";

export class Game {
  constructor() {
    this.state = GameState.PLAYING;
    this.score = 0;
    this.bestScore = 0;
    this.minFoodFallingDelay = 0.2;
    this.maxFoodFallingDelay = 0.8;
    this.foodFallingDelay = this.maxFoodFallingDelay;
    this.minGlobalTime = 0.0;
    this.maxGlobalTime = 12.0;
    this.globalTime = 8.0;
    this.tickValue = 0.1;
    this.timeOfDay = 1;
  }

  play() {
    this.state = GameState.PLAYING;
  }

  isGoing() {
    return this.state === GameState.PLAYING;
  }

  pause() {
    this.state = GameState.PAUSED;
  }

  isPaused() {
    return this.state === GameState.PAUSED;
  }

  increaseScore() {
    this.score++;
  }

  increaseScoreBy(value) {
    this.score += value;
  }

  decreaseScore() {
    this.score--;
  }

  decreaseScoreBy(value) {
    this.score -= value;
  }

  increaseGlobalTime(value) {
    this.globalTime += value;
  }

  increaseFoodFallingDelayBy(value) {
    this.foodFallingDelay += value;
  }

  resetGlobalTime() {
    this.globalTime = 0;
  }

  isDay() {
    return this.timeOfDay === 1;
  }

  isNight() {
    return this.timeOfDay === -1;
  }

  tick() {
    this.globalTime += this.tickValue * this.timeOfDay;
  }

  hours() {
    return parseInt(this.globalTime);
  }

  toggleTimeOfDay() {
    this.timeOfDay = this.isNight() ? 1 : -1;
  }
}
