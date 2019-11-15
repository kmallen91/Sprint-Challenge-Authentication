const request = require("supertest");
const server = require("server");

describe("server", function() {
  describe("POST /", function() {
    it("should return 201 OK", async function() {
      const user = { username: "test1", password: "test1" };
      const res = await request(server).post("/api/auth/register", user);
      expect(res.status).toBe(201);
    });
    it("should return JSON formatted data", async function() {
      const user = { username: "test1", password: "test1" };
      const res = await request(server).post("/api/auth/register", user);
      expect(res.type).toMatch(/json/i);
    });
  });
});

describe("server", function() {
  describe("POST /", function() {
    it("should return 200 OK", async function() {
      const user = { username: "test1", password: "test1" };
      const res = await request(server).post("/api/auth/login", user);
      expect(res.status).toBe(200);
    });
    it("should return JSON formatted data", async function() {
      const user = { username: "test1", password: "test1" };
      const res = await request(server).post("/api/auth/login", user);
      expect(res.type).toMatch(/json/i);
    });
  });
});
