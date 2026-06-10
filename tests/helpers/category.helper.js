const request = require("supertest");
const app = require("../../src/app");

exports.createCategory = async (token) => {
  console.log("TOKEN IN CREATE CATEGORY HELPER", token);
  const response = await request(app)
    .post("/api/categories/create")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Mobiles",
    });
  console.log("CREATE CATEGORY RESPONSE", response.body);
  return response.body.data;
};
