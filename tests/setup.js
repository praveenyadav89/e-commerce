require("dotenv").config();
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
const Role = require("../src/models/Role");

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  const uri = mongoServer.getUri();

  process.env.MONGO_URI = uri;

  await mongoose.connect(uri);
  await Role.create([
    {
      name: "SUPER_ADMIN",
      permissions: ["*"],
    },
    {
      name: "CUSTOMER",
      permissions: [],
    },
  ]);
});

// afterEach(async () => {
//   const collections = mongoose.connection.collections;

//   for (const key in collections) {
//     // await collections[key].deleteMany();
//   }
// });

afterAll(async () => {
  await mongoose.connection.dropDatabase();

  await mongoose.connection.close();

  await mongoServer.stop();
});
