const supertest = require("supertest");
const { app: _app } = require("../app");

describe("test endpoint /users", () => {
  describe("GET1", () => {
    it("1", async () => {
      const app = await supertest(_app);

      const urlsAndHttpCodes = {
        "/api/users/1": 200,
        "api/users/ll": 400,
      };
      for (const url of Object.keys(urlsAndHttpCodes)) {
        await app.get(url).expect(urlsAndHttpCodes[url]);
      }
    });
  });
});
