import { ColleagueStatus } from "./colleagueStatus.js";

export class Colleague extends PIXI.AnimatedSprite {
  constructor(src, options = {}) {
    super(src);
    this.status = ColleagueStatus.PASSIVE;
    this.lookOutMoment = options.lookOutMoment || 24;
    this.lookedOut = false;
  }

  isPassive() {
    return this.status === ColleagueStatus.PASSIVE;
  }

  isActive() {
    return this.status === ColleagueStatus.ACTIVE;
  }

  isCurious() {
    return this.status === ColleagueStatus.CURIOUS;
  }

  setCurious() {
    this.status = ColleagueStatus.CURIOUS;
  }

  setActive() {
    this.status = ColleagueStatus.ACTIVE;
  }

  setPassive() {
    this.status = ColleagueStatus.PASSIVE;
  }

  hasLookedOut() {
    return this.lookedOut;
  }

  hasNotLookedOut() {
    return this.lookedOut === false;
  }

  lookOut() {
    this.gotoAndStop(1);
  }

  lookOutAndHide() {
    this.lookedOut = true;

    this.gotoAndPlay(0);
    this.onComplete = () => {
      this.gotoAndStop(0);
    };
  }

  hide() {
    this.gotoAndStop(0);
  }

  resetLookOut() {
    if (this.hasNotLookedOut() && this.isPassive()) {
      return;
    }
    this.lookedOut = false;
  }
}
