const asyncHandler = require("../utils/asyncHandler");

const orderService = require("../services/order.service");

exports.placeOrder = asyncHandler(async (req, res) => {
  const order = await orderService.placeOrder(req.user.id);

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: order,
  });
});

exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getMyOrders(req.user.id);

  res.status(200).json({
    success: true,
    data: orders,
  });
});

exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);

  res.status(200).json({
    success: true,
    data: order,
  });
});

exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getAllOrders();

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatus(
    req.params.id,
    req.body.status,
  );

  res.status(200).json({
    success: true,
    message: "Status updated",
    data: order,
  });
});
