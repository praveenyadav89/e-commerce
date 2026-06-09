const Role = require("../models/Role");

exports.createRole = async (payload) => {
  const exists = await Role.findOne({
    name: payload.name,
  });

  if (exists) {
    throw new Error("Role already exists");
  }

  return await Role.create(payload);
};

exports.getRoles = async () => {
  return await Role.find();
};

exports.getRoleById = async (id) => {
  return await Role.findById(id);
};

exports.updateRole = async (id, payload) => {
  return await Role.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

exports.deleteRole = async (id) => {
  return await Role.findByIdAndDelete(id);
};
