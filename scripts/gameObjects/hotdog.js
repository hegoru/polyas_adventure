import { Stuff } from "./stuff.js";

export class Hotdog extends Stuff {
  constructor(src, options = {}) {
    super(src);
    this.scoreValue = 5;
    this.satietyValue = 0.03;
    this.rotationSpeed = options.rotationSpeed || 0.025;
    this.fallingSpeed = options.fallingSpeed || 2;
  }
}
