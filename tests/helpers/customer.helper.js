// tests/helpers/customer.helper.js

const request = require("supertest");
const app = require("../../src/app");

exports.createCustomer = async () => {
  await request(app).post("/api/auth/register").send({
    name: "Customer",
    email: "customer@test.com",
    password: "Password@123",
    role: "CUSTOMER",
  });

  const login = await request(app).post("/api/auth/login").send({
    email: "customer@test.com",
    password: "Password@123",
  });

  return login.body.data.token;
};
