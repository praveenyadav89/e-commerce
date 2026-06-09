const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

exports.getDashboardStats = async () => {
  const [totalUsers, totalProducts, totalCategories, totalOrders] =
    await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
    ]);

  const revenueResult = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  const totalRevenue =
    revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

  return {
    totalUsers,
    totalProducts,
    totalCategories,
    totalOrders,
    totalRevenue,
  };
};
exports.getLatestOrders = async () => {
  return await Order.find()
    .populate("user", "name email")
    .sort({
      createdAt: -1,
    })
    .limit(10);
};
exports.getRecentUsers = async () => {
  return await User.find()
    .select("-password")
    .sort({
      createdAt: -1,
    })
    .limit(10);
};

exports.getOrderSummary = async () => {
  return await Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
  ]);
};
