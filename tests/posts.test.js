const supertest = require("supertest");
let app, postId;

const postAbstrObj = expect.objectContaining({
  title: expect.any(String),
  content: expect.any(String),
  id: expect.any(Number),
  userId: expect.any(Number),
});

describe("/api/posts", () => {
  beforeAll(async () => {
    postId = 1;

    const express = require("express");
    const { logger, getTimeStr } = require("../utils/logger.js"),
      router = require("../routes/posts.router.js");

    app = express();
    app.use(express.json());

    app.use((req, res, next) => {
      let data = "";
      if (req.url.includes("api")) data = JSON.stringify(req.body);
      if (["GET", "DELETE"].includes(req.method)) data = "";

      logger.info(`${getTimeStr()} ${req.method} ${req.url} ${data}`);
      next();
    });

    app.all("*", router);
    app.listen(8000, () => {
      logger.info("server listening");
    });
  });

  it("POST", async () => {
    // Arrange
    const newPostJson = {
      title: "test new post",
      content: "testing new post content",
      userId: 2,
    };
    const expectedResult = { id: expect.any(Number) };

    // Act
    const res = await supertest(app)
      .post("/api/posts/")
      .set("Content-Type", "application/json")
      .send(newPostJson);

    // Assert
    expect(res.status).toBe(201);
    expect(res.body).toEqual(expectedResult);
    postId = res.body.id;
  });

  it("GET1", async () => {
    // Act
    const res = await supertest(app).get(`/api/posts/${postId}`);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual(postAbstrObj);
  });

  it("GET10", async () => {
    // Arrange
    const from = 0,
      to = 10;

    // Act
    const res = await supertest(app).get(`/api/posts/range/${from}/${to}`);

    // Assert
    expect(res.status).toBe(200);
    for (const post of res.body) {
      expect(post).toEqual(postAbstrObj);
    }
  });

  it("PATCH", async () => {
    // Arrange
    const patchedPostJson = {
      title: "test patc",
      content: "testing new post content patched",
    };
    const expectedResult = {};

    // Act
    const res = await supertest(app)
      .patch(`/api/posts/${postId}`)
      .set("Content-Type", "application/json")
      .send(patchedPostJson);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResult);
  });

  it("DELETE", async () => {
    // Arrange
    const expectedResult = {};

    // Act
    const res = await supertest(app).delete(`/api/posts/${postId}`);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedResult);
  });
});
