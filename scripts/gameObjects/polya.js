export class Polya extends PIXI.AnimatedSprite {
  constructor(src, options = {}) {
    super(src);
    this.direction = options.direction || 1;
    this.minMovementSpeed = 7;
    this.maxMovementSpeed = 14;
    this.movementSpeed = options.movementSpeed || this.maxMovementSpeed;
    this.boostSpeedCoeff = 1.0;
    this.hungerCoefficient = 0.00075;
    this.satiety = 1.0;
    this.maxSatiety = 1.0;
  }

  changeScaleTo(scaleValue) {
    if (this.scale.x === scaleValue) {
      return;
    }

    this.scale.x = scaleValue;
  }

  flipHorizontal() {
    this.scale.set(-this.scale.x, 1);
  }

  move() {
    // TODO change to possible min speed = 7
    // this.updateMovementSpeed();
    const tempSpeed = Math.max(this.minMovementSpeed, this.movementSpeed * this.satiety);
    this.x += tempSpeed * this.scale.x;
  }

  moveTo(value) {
    this.x += this.movementSpeed * value;
  }

  saturateBy(value) {
    if (this.satiety + value > this.maxSatiety) {
      this.satiety = this.maxSatiety;
      return;
    }
    this.satiety += value;
  }

  resetSatiety() {
    this.satiety = this.maxSatiety;
  }

  updateHunger() {
    this.satiety -= this.hungerCoefficient;
  }

  hungerBy(value) {
    this.satiety -= value;
  }

  isHungry() {
    return this.satiety < 0.01;
  }
}
