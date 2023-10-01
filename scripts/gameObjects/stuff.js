import { GameObject } from "./gameObject.js";

export class Stuff extends GameObject {
  constructor(src, options = {}) {
    super(src);
    this.scoreValue = options.value || 1;
    this.satietyValue = options.value || 0.01;
    this.rotationSpeed = options.rotationSpeed || 0.1;
    this.fallingSpeed = options.fallingSpeed || 2;
    this.tag = "stuff";
  }

  update() {
    this.y += this.fallingSpeed;
    this.rotation += this.rotationSpeed;
  }

  hitTest(obj) {
    let hit = false;

    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    obj.centerX = obj.x + obj.width / 2;
    obj.centerY = obj.y + obj.height / 2;

    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
    obj.halfWidth = obj.width / 2;
    obj.halfHeight = obj.height / 2;
    obj.quarterWidth = obj.width / 4;
    obj.quarterHeight = obj.height / 4;

    const vx = this.centerX - obj.centerX;
    const vy = this.centerY - obj.centerY;

    const combinedHalfWidths = this.halfWidth + obj.quarterWidth;
    const combinedHalfHeights = this.halfHeight + obj.quarterHeight;

    if (Math.abs(vx) < combinedHalfWidths) {
      if (Math.abs(vy) < combinedHalfHeights) {
        hit = true;
      } else {
        hit = false;
      }
    } else {
      hit = false;
    }

    return hit;
  }
}
