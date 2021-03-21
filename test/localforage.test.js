const mock = require("./mockLocalforage");
const main = require("../popup/main.js");
const utils = require("../popup/utils");

global.localforage = new mock.LocalStorageMock;
global.getMonday = utils.getMonday;

test("Correctly adds reading time from items in localforage", async () => {
  const total = await main.getReadingTime();
  expect(total).toEqual(14);
});

test("Correctly saves a given URL", async () => {
  const total = await main.saveURL();
  expect(total).toEqual(14);
});