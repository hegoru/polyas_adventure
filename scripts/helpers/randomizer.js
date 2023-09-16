export class Randomizer {
  static intBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static floatBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  static float() {
    return Math.random();
  }
}

export const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const probability = (n) => {
  return Math.random() < n;
};