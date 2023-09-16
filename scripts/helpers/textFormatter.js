export class TextFormatter {
  static addLeadingZeros(num, zerosAmount) {
    return num.toString().padStart(zerosAmount, "0");
  }
}

export const textWithLeadingZeros = (text, zerosAmount) =>
  text.toString().padStart(zerosAmount, "0");
