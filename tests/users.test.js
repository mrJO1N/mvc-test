const supertest = require("supertest");
let app;

const userAbstrObj = expect.objectContaining({
    id: expect.any(Number),
    username: expect.any(String),
  }),
  moduleVars = { userId: 1 };

describe("/api/users", () => {
  beforeAll(async () => {
    const express = require("express");
    const { logger, getTimeStr } = require("../helpers/logger.js"),
      router = require("../routes/users.router.js");

    app = express();
    app.use(express.json());

    app.use((req, res, next) => {
      let data = "";
      if (req.url.includes("api")) data = JSON.stringify(req.body);
      if (["GET", "DELETE"].includes(req.method)) data = "";

      logger.info(`${getTimeStr()} ${req.method} ${req.url} ${data}`);
      next();
    });

    app.use(router);
    app.listen(3001, () => {
      console.log("running on port 3001");
    });
  });

  it("GET1", async () => {
    // Act
    const res = await supertest(app).get(`/api/users/${moduleVars.userId}`);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual({});
  });

  it("GET10", async () => {
    // Arrange
    const from = 0,
      to = 10;

    // Act
    const res = await supertest(app).get(`/api/users/range/${from}/${to}`);

    // Assert
    expect(res.status).toBe(200);
    for (const user of res.body) {
      expect(user).toEqual(userAbstrObj);
    }
  });

  it("POST", async () => {
    // Arrange
    const username = "test";
    const expectedResult = { id: expect.any(Number) };

    // Act
    const res = await supertest(app)
      .post("/api/users")
      .set("Content-Type", "application/json")
      .send({ username });

    // Assert
    expect(res.status).toBe(201);
    expect(res.body).toEqual(expectedResult);

    moduleVars.userId = res.body.id;
  });

  it("PATCH", async () => {
    // Arrange
    const newUsername = "test new username";
    const expectedResult = {};

    // Act
    const res = await supertest(app)
      .patch(`/api/users/${moduleVars.userId}`)
      .set("Content-Type", "application/json")
      .send({ username: newUsername });

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResult);
  });

  it("DELETE", async () => {
    // Arrange
    const expectedResult = {};

    // Act
    const res = await supertest(app).delete(`/api/users/${moduleVars.userId}`);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResult);
  });
});
