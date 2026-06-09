const express = require("express");

const router = express.Router();

const roleController = require("../controllers/role.controller");

const { protect } = require("../middlewares/auth.middleware");

const { hasPermission } = require("../middlewares/permission.middleware");

router.post(
  "/",
  protect,
  hasPermission("CREATE_ROLE"),
  roleController.createRole,
);

router.get("/", protect, hasPermission("VIEW_ROLE"), roleController.getRoles);

router.get(
  "/:id",
  protect,
  hasPermission("VIEW_ROLE"),
  roleController.getRoleById,
);

router.put(
  "/:id",
  protect,
  hasPermission("UPDATE_ROLE"),
  roleController.updateRole,
);

router.delete(
  "/:id",
  protect,
  hasPermission("DELETE_ROLE"),
  roleController.deleteRole,
);

module.exports = router;
