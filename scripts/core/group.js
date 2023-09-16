export class Group {
  constructor() {
    this.elems = [];
  }

  add(elem) {
    this.elems.push(elem);
  }

  remove(elem) {
    const idx = this.elems.indexOf(elem);

    if (idx < 0) {
      console.log("There is no such element in that collection.");
      return;
    }

    this.elems.splice(idx, 1);
  }

  removeAll() {
    this.elems = [];
  }

  removeAll2() {
    this.elems.splice(0, this.elems.length);
  }
}
