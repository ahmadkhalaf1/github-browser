import request from "supertest";
import app from "../app";
import * as githubController from "./gitHubController";

describe("Test list bookmarks repositories", () => {
  test("It should response with 200", async (done: any) => {
    await request(app)
      .get("/api/v1/repos/bookmarks")
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  }, 30000);
});

describe("Test search bookmarks repositories", () => {
  test("It should response with 200", async (done: any) => {
    await request(app)
      .get("/api/v1/repos/q=reactjs")
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  }, 30000);
});

describe("Test set bookmark repositories", () => {
  test("It should response with 200", async (done: any) => {
    await request(app)
      .post("/api/v1/repos/bookmarks")
      .send({ ownerName: "ntkme", repoName: "react-github-btn" })
      .then((response: any) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  }, 30000);
});

describe("Test remove bookmark repositories", () => {
    test("It should response with 200", async (done: any) => {
      await request(app)
        .delete("/api/v1/repos/bookmarks/ntkme/react-github-btn")
        .then((response: any) => {
          expect(response.statusCode).toBe(200);
          done();
        });
    }, 30000);
  });
describe("Test search bookmarks repositories", () => {
  test("It should response with 404", async (done: any) => {
    await request(app)
      .get("/api/v1/repos/q=babelhara")
      .then((response: any) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  }, 30000);
});
