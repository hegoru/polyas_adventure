export class Scene {
  constructor() {
    this.minBrightness = 0.66;
    this.maxBrightness = 1.0;
    this.brightness = this.maxBrightness;
    this.backgroundColor = 0x7dc1ff;
  }

  decreaseBrightnessBy(value) {
    this.brightness -= value;
  }

  increaseBrightnessBy(value) {
    this.brightness += value;
  }

  resetBrightness() {
    this.brightness = this.maxBrightness;
  }
}
