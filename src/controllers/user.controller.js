const asyncHandler = require("../utils/asyncHandler");

const userService = require("../services/user.service");

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

exports.assignRole = asyncHandler(async (req, res) => {
  const user = await userService.assignRole(req.params.id, req.body.roleId);

  res.status(200).json({
    success: true,
    message: "Role assigned successfully",
    data: user,
  });
});
