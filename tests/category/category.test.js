const request = require("supertest");

const app = require("../../src/app");

const { createCategory } = require("../helpers/category.helper");

const { createAdmin } = require("../helpers/superAdmin.helper");

describe("Category APIs", () => {
  let token;

  beforeAll(async () => {
    token = await createAdmin();
    console.log("TOKEN:", token);
  });
  it("should create category", async () => {
    const category = await createCategory(token);
    expect(category).toHaveProperty("_id");
    expect(category.name).toBe("Mobiles");
  });
});
