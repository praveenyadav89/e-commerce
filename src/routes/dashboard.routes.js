const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");

const { protect } = require("../middlewares/auth.middleware");

const { hasPermission } = require("../middlewares/permission.middleware");

router.get(
  "/dashboard",
  protect,
  hasPermission("VIEW_DASHBOARD"),
  dashboardController.dashboard,
);

router.get(
  "/latest-orders",
  protect,
  hasPermission("VIEW_LATEST_ORDERS"),
  dashboardController.latestOrders,
);

router.get(
  "/recent-users",
  protect,
  hasPermission("VIEW_RECENT_USERS"),
  dashboardController.recentUsers,
);

router.get(
  "/order-summary",
  protect,
  hasPermission("VIEW_ORDER_SUMMARY"),
  dashboardController.orderSummary,
);

module.exports = router;
