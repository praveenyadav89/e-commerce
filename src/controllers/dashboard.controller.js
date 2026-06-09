const asyncHandler = require("../utils/asyncHandler");

const dashboardService = require("../services/dashboard.service");

exports.dashboard = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getDashboardStats();

  res.status(200).json({
    success: true,
    data: stats,
  });
});

exports.latestOrders = asyncHandler(async (req, res) => {
  const orders = await dashboardService.getLatestOrders();

  res.status(200).json({
    success: true,
    data: orders,
  });
});

exports.recentUsers = asyncHandler(async (req, res) => {
  const users = await dashboardService.getRecentUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.orderSummary = asyncHandler(async (req, res) => {
  const result = await dashboardService.getOrderSummary();

  res.status(200).json({
    success: true,
    data: result,
  });
});
