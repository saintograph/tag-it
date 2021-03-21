const chrome = require("sinon-chrome");
const utils = require("../popup/utils");

window.chrome = chrome;

test("Test the validURL function", () => {
  expect(utils.validURL("abcd1234")).toEqual(false);
  expect(utils.validURL("http://abcd1234 .com")).toEqual(false);
  expect(utils.validURL("abcd1234.com")).toBeTruthy();
  expect(utils.validURL("http://abcd1234.com")).toBeTruthy();
});

test("Test the timestamp function", () => {
  const testDateFunction = utils.getCurrentTimeStamp();
  const testDate = new Date().toJSON();
  expect(testDateFunction.substring(0, testDateFunction.length - 5)).toEqual(testDate.substring(0, testDate.length - 5));
});

test("Test the generate ID function", () => {
  expect(utils.generateID().length).toBeLessThanOrEqual(20);
});

test("Test the open new tab function", () => {
  expect(chrome.runtime.getURL("../popup/newTab.html")).toEqual(utils.openTab());
});
