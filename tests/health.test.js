const { setDigitsCount } = require("../helpers/logger.js");

describe("test logger.js", () => {
  it("setDigitsCount()", () => {
    const inAndOuts = {
      999: "999",
      1: "001",
      1000: "000",
      [-5]: "005",
      [-1000]: "000",
      lll: "0",
      5.7: "057",
      [{ key: "k" }]: "000",
    };
    for (const input of Object.keys(inAndOuts)) {
      expect(setDigitsCount(3, input)).toBe(inAndOuts[input]);
    }
  });
});
