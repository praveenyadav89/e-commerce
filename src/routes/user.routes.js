const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

const { protect } = require("../middlewares/auth.middleware");

const { hasPermission } = require("../middlewares/permission.middleware");

router.get("/profile", protect, userController.getProfile);

router.get(
  "/all",
  protect,
  hasPermission("VIEW_ALL_USERS"),
  userController.getAllUsers,
);

router.put(
  "/:id/role",
  protect,
  hasPermission("ASSIGN_ROLE"),
  userController.assignRole,
);

module.exports = router;
