const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (userId, payload) => {
  const { productId, quantity } = payload;

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  let cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();

  return cart;
};
exports.getCart = async (userId) => {
  const cart = await Cart.findOne({
    user: userId,
  }).populate({
    path: "items.product",
    select: "name price stock images",
  });

  if (!cart) {
    return null;
  }

  let totalAmount = 0;

  cart.items.forEach((item) => {
    totalAmount += item.product.price * item.quantity;
  });

  return {
    cart,
    totalAmount,
  };
};
exports.updateCartItem = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find((i) => i.product.toString() === productId);

  if (!item) {
    throw new Error("Item not found");
  }
  const product = await Product.findById(productId);

  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  item.quantity = quantity;

  await cart.save();

  return cart;
};

exports.removeCartItem = async (userId, productId) => {
  const cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  await cart.save();

  return cart;
};
