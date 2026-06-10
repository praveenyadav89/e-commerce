const request = require("supertest");
const app = require("../../src/app");

const { setupStore } = require("../helpers/setup.helper");

let store;

beforeAll(async () => {
  store = await setupStore();
});

describe("Cart APIs", () => {
  it("should add product to cart", async () => {
    const response = await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${store.customerToken}`)
      .send({
        productId: store.product._id,
        quantity: 2,
      });
    console.log("ADD TO CART RESPONSE", response.body);
    expect(response.status).toBe(200);
  });

  it("should get cart", async () => {
    const response = await request(app)
      .get("/api/cart")
      .set("Authorization", `Bearer ${store.customerToken}`);
    console.log("GET CART RESPONSE", response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.cart.items.length).toBeGreaterThan(0);
  });
  it("should place order", async () => {
    const response = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${store.customerToken}`)
      .send(); // or address/payment payload if required

    console.log("ORDER RESPONSE:", response.body);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("should get orders", async () => {
    const response = await request(app)
      .get("/api/orders/my-orders")
      .set("Authorization", `Bearer ${store.customerToken}`);

    console.log("GET ORDERS:", response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
