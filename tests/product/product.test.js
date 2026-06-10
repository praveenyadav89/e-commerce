const request = require("supertest");
const app = require("../../src/app");

const { createCategory } = require("../helpers/category.helper");
const { createAdmin } = require("../helpers/superAdmin.helper");
const { createProduct } = require("../helpers/product.helper");

let token;
let category;

beforeAll(async () => {
  token = await createAdmin();
  category = await createCategory(token);
});

describe("Product APIs", () => {
  it("should create product", async () => {
    const product = await createProduct(token, category._id);

    expect(product).toHaveProperty("_id");
    expect(product.name).toBeTruthy();
  });
});
