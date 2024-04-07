const { setDigitsCount } = require("../helpers/logger.js");

describe("test logger.js", () => {
  it("setDigitsCount()", () => {
    const inAndOuts = {
      999: "999",
      1: "001",
      1000: "000",
      [-1000]: "000",
      [-5]: "005",
      lll: "0",
      5.7: "057",
      [{ key: "k" }]: "0",
    };
    for (const input of Object.keys(inAndOuts)) {
      expect(setDigitsCount(3, input)).toBe(inAndOuts[input]);
    }
  });
});
