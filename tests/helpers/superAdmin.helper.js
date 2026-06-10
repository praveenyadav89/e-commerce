const request = require("supertest");
const app = require("../../src/app");

const Role = require("../../src/models/Role");

exports.createAdmin = async () => {
  await Role.findOneAndUpdate(
    { name: "SUPER_ADMIN" },
    {
      $set: {
        permissions: [
          "CREATE_PRODUCT",
          "UPDATE_PRODUCT",
          "DELETE_PRODUCT",
          "CREATE_CATEGORY",
          "UPDATE_CATEGORY",
          "DELETE_CATEGORY",
          "VIEW_ORDERS",
          "VIEW_ALL_ORDERS",
          "UPDATE_ORDER_STATUS",
          "VIEW_ROLE",
          "CREATE_ROLE",
          "UPDATE_ROLE",
          "DELETE_ROLE",
          "VIEW_ALL_USERS",
          "ASSIGN_ROLE",
          "VIEW_DASHBOARD",
          "VIEW_LATEST_ORDERS",
          "VIEW_RECENT_USERS",
          "VIEW_ORDER_SUMMARY",
        ],
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "owner@test.com",
    password: "123456",
    role: "SUPER_ADMIN",
  });

  const login = await request(app).post("/api/auth/login").send({
    email: "owner@test.com",
    password: "123456",
  });
  console.log("LOGIN RESPONSE", login.body);
  return login.body.data.token;
};
