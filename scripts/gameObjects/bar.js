export class Bar extends PIXI.Graphics {
  constructor(x = 0, y = 0, opts = {}) {
    super();
    this.x = x;
    this.y = y;
    this.width = 100 || opts.width;
    this.height = 8 || opts.height;
    this.value = 0;
    this.maxValue = 100;
    this.fillColor = opts.fillColor || 0x650a5a;
    this.strokeColor = opts.strokeColor;
  }

  draw() {
    this.beginFill(this.fillColor);
    this.drawRect(this.x, this.y, this.width, this.height);
    this.endFill();
  }
}
