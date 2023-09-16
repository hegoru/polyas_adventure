export class MouseButton {
  static LEFT = 0;
  static WHEEL = 1;
  static RIGHT = 2;
}

export class MouseManager {
  constructor() {
    this.leftKeyPressed = false;
    this.rightKeyPressed = false;
  }
}
