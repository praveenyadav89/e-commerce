const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/category.controller");

const { protect } = require("../middlewares/auth.middleware");

const { hasPermission } = require("../middlewares/permission.middleware");

router.post(
  "/create",
  protect,
  hasPermission("CREATE_CATEGORY"),
  categoryController.createCategory,
);

router.get("/", categoryController.getCategories);

router.get("/:id", categoryController.getCategoryById);

router.put(
  "/:id",
  protect,
  hasPermission("UPDATE_CATEGORY"),
  categoryController.updateCategory,
);

router.delete(
  "/:id",
  protect,
  hasPermission("DELETE_CATEGORY"),
  categoryController.deleteCategory,
);

module.exports = router;
