const request = require("supertest");
const app = require("../../src/app");

const { createAdmin } = require("./superAdmin.helper");
const { createCategory } = require("./category.helper");
const { createProduct } = require("./product.helper");
const { createCustomer } = require("./customer.helper");

exports.setupStore = async () => {
  const adminToken = await createAdmin();

  const category = await createCategory(adminToken);

  const product = await createProduct(adminToken, category._id);

  const customerToken = await createCustomer();

  return {
    adminToken,
    customerToken,
    category,
    product,
  };
};
