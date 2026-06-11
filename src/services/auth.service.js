const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const BlacklistedToken = require("../models/BlacklistedToken");

exports.registerUser = async (payload) => {
  const { name, email, password, role } = payload;
  console.log("payload", payload);

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let roles;

  if (!role || role === "") {
    roles = await Role.findOne({
      name: "CUSTOMER",
    });
  } else {
    roles = await Role.findOne({
      name: role,
    });

    if (!roles) {
      throw new Error("Invalid role");
    }

    if (roles.name === "super_admin") {
      const existingSuperAdmin = await User.findOne({
        role: roles._id,
      });

      if (existingSuperAdmin) {
        throw new Error("Super Admin already exists");
      }
    }
  }
  if (!roles) {
    throw new Error(`Role '${role || "CUSTOMER"}' not found`);
  }
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: roles._id,
  });

  return user;
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  user.password = undefined;

  return {
    token,
    user,
  };
};

exports.logoutUser = async (token) => {
  const existingToken = await BlacklistedToken.findOne({
    token,
  });

  if (existingToken) {
    throw new Error("User already logged out");
  }
  await BlacklistedToken.create({
    token,
  });

  return {
    success: true,
    message: "Logout successful",
  };
};
