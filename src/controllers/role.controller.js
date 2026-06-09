const asyncHandler = require("../utils/asyncHandler");

const roleService = require("../services/role.service");

exports.createRole = asyncHandler(async (req, res) => {
  const role = await roleService.createRole(req.body);

  res.status(201).json({
    success: true,
    data: role,
    message: "Role created",
  });
});

exports.getRoles = asyncHandler(async (req, res) => {
  const roles = await roleService.getRoles();

  res.status(200).json({
    success: true,
    data: roles,
    message: "Roles retrieved",
  });
});

exports.getRoleById = asyncHandler(async (req, res) => {
  const role = await roleService.getRoleById(req.params.id);

  res.status(200).json({
    success: true,
    data: role,
    message: "Role retrieved",
  });
});

exports.updateRole = asyncHandler(async (req, res) => {
  const role = await roleService.updateRole(req.params.id, req.body);

  res.status(200).json({
    success: true,
    data: role,
    message: "Role updated",
  });
});

exports.deleteRole = asyncHandler(async (req, res) => {
  await roleService.deleteRole(req.params.id);

  res.status(200).json({
    success: true,
    message: "Role deleted",
  });
});
