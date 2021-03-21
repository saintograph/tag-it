class LocalStorageMock {
  constructor() {
    this.store = {};
    this.entries = require("./json/mockData.json");
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    const data = this.entries.data;
    // insert valid date
    data.forEach(entry => {
      entry.timestamp = new Date();
    })
    return JSON.stringify(data.find(x => x.id === key));
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }

  keys() {
    return ["klp9ciaq19tygt54bc4", "klp9a9escq0mdym5cqd"]
  }
}

exports.LocalStorageMock = LocalStorageMock;
