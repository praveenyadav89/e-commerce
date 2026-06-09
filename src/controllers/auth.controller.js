const authService = require("../services/auth.service");

const asyncHandler = require("../utils/asyncHandler");

exports.register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);

  user.password = undefined;

  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    data: user,
  });
});

exports.login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body.email, req.body.password);

  res.status(200).json({
    success: true,
    message: "Login Success",
    data: result,
  });
});
