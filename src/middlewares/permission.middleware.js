const User = require("../models/User");

exports.hasPermission = (permission) => async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("role");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const permissions = user.role.permissions;

  if (!permissions.includes(permission)) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  next();
};
