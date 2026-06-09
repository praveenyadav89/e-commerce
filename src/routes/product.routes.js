const express = require("express");

const router = express.Router();

const productController = require("../controllers/product.controller");

const { protect } = require("../middlewares/auth.middleware");

const { hasPermission } = require("../middlewares/permission.middleware");

const upload = require("../middlewares/upload.middleware");

router.post(
  "/",
  upload.array("images", 5),
  protect,
  hasPermission("CREATE_PRODUCT"),
  productController.createProduct,
);

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.put(
  "/:id",
  upload.array("images", 5),
  protect,
  hasPermission("UPDATE_PRODUCT"),
  productController.updateProduct,
);

router.delete(
  "/:id",
  protect,
  hasPermission("DELETE_PRODUCT"),
  productController.deleteProduct,
);

module.exports = router;
