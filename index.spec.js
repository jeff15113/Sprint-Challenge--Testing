//import request from "supertest";
//import server from "./index";

const request = require("supertest");
const server = require("./server");

const db = require("./data/dbConfig.js");

describe("POST index", () => {
  afterEach(async () => {
    await db("games").truncate();
  });

  it("should respond 200 as expected", async () => {
    const body = { title: "Testgame", genre: "dev", Year: "2020" };
    const response = await request(server)
      .post("/api/games")
      .send(body);
    expect(response.status).toEqual(200);
  });

  it("should respond 422 as expected", async () => {
    const body = { title: "Testgame" };
    const response = await request(server)
      .post("/api/games")
      .send(body);
    expect(response.status).toEqual(422);
  });
});

describe("GET index", () => {
  it("should respond as expected", async () => {
    const response = await request(server).get("/api/games");
    expect(response.status).toEqual(200);
  });
});
