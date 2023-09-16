export class GameObject extends PIXI.Sprite {
  constructor(src) {
    super(src);
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

    const vx = this.centerX - obj.centerX;
    const vy = this.centerY - obj.centerY;

    const combinedHalfWidths = this.halfWidth + obj.halfWidth;
    const combinedHalfHeights = this.halfHeight + obj.halfHeight;

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
