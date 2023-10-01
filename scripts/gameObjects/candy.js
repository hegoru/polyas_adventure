import { Stuff } from "./stuff.js";

export class Candy extends Stuff {
  constructor(src, options = {}) {
    super(src);
    this.scoreValue = 1;
    this.satietyValue = 0.07;
    this.rotationSpeed = options.rotationSpeed || 0.1;
    this.fallingSpeed = options.fallingSpeed || 3;
    this.tag = "candy";
  }
}
