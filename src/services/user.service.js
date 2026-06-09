const User = require("../models/User");
const Role = require("../models/Role");

exports.getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  return user;
};

exports.getAllUsers = async () => {
  const users = await User.find().select("-password");

  return users;
};

exports.assignRole = async (userId, roleId) => {
  console.log("userId", userId);
  console.log("roleId", roleId);
  const role = await Role.findById(roleId);

  if (!role) {
    throw new Error("Role not found");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    {
      role: roleId,
    },
    {
      new: true,
    },
  ).populate("role");

  return user;
};
