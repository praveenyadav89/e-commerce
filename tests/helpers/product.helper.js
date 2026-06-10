const request = require("supertest");
const app = require("../../src/app");

exports.createProduct = async (token, categoryId) => {
  const response = await request(app)
    .post("/api/products")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "iPhone 10",
      sku: "IPHONE10",
      price: 1000,
      stock: 10,
      category: categoryId,
      description: "Latest iPhone model",
    });

  return response.body.data;
};
