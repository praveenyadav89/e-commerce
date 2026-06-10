const request = require("supertest");
const app = require("../../src/app");
const Role = require("../../src/models/Role");

beforeAll(async () => {
  await Role.create({
    name: "ADMIN",
    permissions: [],
  });
});

describe("Auth APIs", () => {
  it("should register and login user", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Praveen",
      email: "admin1@gmail.com",
      password: "123456",
      role: "ADMIN",
    });

    const login = await request(app).post("/api/auth/login").send({
      email: "admin1@gmail.com",
      password: "123456",
    });

    expect(login.statusCode).toBe(200);
    expect(login.body.data.token).toBeDefined();
  });
});
