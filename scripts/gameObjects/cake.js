import { Stuff } from "./stuff.js";

export class Cake extends Stuff {
  constructor(src, options = {}) {
    super(src);
    this.scoreValue = 25;
    this.satietyValue = 0.01;
    this.rotationSpeed = options.rotationSpeed || 0.05;
    this.fallingSpeed = options.fallingSpeed || 2;
  }
}
