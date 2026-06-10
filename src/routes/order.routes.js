const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order.controller");

const { protect } = require("../middlewares/auth.middleware");

const { hasPermission } = require("../middlewares/permission.middleware");
console.log("hasPermission", hasPermission);
router.post("/", protect, orderController.placeOrder);

router.get("/my-orders", protect, orderController.getMyOrders);

router.get("/:id", protect, orderController.getOrderById);

router.get(
  "/admin/all",
  protect,
  hasPermission("VIEW_ALL_ORDERS"),
  orderController.getAllOrders,
);

router.put(
  "/:id/status",
  protect,
  hasPermission("UPDATE_ORDER_STATUS"),
  orderController.updateStatus,
);

module.exports = router;
