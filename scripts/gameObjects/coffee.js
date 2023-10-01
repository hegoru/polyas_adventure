import { Stuff } from "./stuff.js";

export class Coffee extends Stuff {
  constructor(src, options = {}) {
    super(src);
    this.scoreValue = 100;
    this.satietyValue = 0.5;
    this.rotationSpeed = options.rotationSpeed || 0;
    this.fallingSpeed = options.fallingSpeed || 2;
    this.tag = "coffee";
  }
}
