const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const getNextOrderId = require("../utils/genarteOrderId");

exports.placeOrder = async (userId) => {
  const cart = await Cart.findOne({
    user: userId,
  }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let totalAmount = 0;

  const orderItems = [];

  for (const item of cart.items) {
    const product = item.product;

    if (product.stock < item.quantity) {
      throw new Error(`${product.name} out of stock`);
    }

    product.stock -= item.quantity;

    await product.save();

    totalAmount += product.price * item.quantity;

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }
  const orderId = await getNextOrderId();
  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalAmount,
    orderId,
  });

  cart.items = [];

  await cart.save();

  return order;
};

exports.getMyOrders = async (userId) => {
  return await Order.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

exports.getOrderById = async (id) => {
  return await Order.findById(id)
    .populate("user", "name email")
    .populate("items.product");
};

exports.getAllOrders = async () => {
  return await Order.find().populate("user", "name email").sort({
    createdAt: -1,
  });
};

exports.updateOrderStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(
    orderId,
    {
      status,
    },
    {
      new: true,
    },
  );
};
