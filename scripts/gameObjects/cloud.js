export class Cloud extends PIXI.Sprite {
  constructor(src, options) {
    super(src);
    this.anchor.x = options.anchorX || 0; // (0, 0.5);
    this.anchor.y = options.anchorY || 0;
    this.scale.set(options.scale || 1);
    this.movementSpeed = options.movementSpeed || 1;
  }

  update() {
    this.x += this.movementSpeed;
  }
}
