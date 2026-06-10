const asyncHandler = require("../utils/asyncHandler");

const cartService = require("../services/cart.service");

exports.addToCart = asyncHandler(async (req, res) => {
  const cart = await cartService.addToCart(req.user.id, req.body);

  res.status(200).json({
    success: true,
    message: "Product added to cart",
    data: cart,
  });
});

exports.getCart = asyncHandler(async (req, res) => {
  const result = await cartService.getCart(req.user.id);

  res.status(200).json({
    success: true,
    data: result,
  });
});

exports.updateCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.updateCartItem(
    req.user.id,
    req.params.productId,
    req.body.quantity,
  );

  res.status(200).json({
    success: true,
    message: "Cart updated",
    data: cart,
  });
});

exports.removeCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.removeCartItem(
    req.user.id,
    req.params.productId,
  );

  res.status(200).json({
    success: true,
    message: "Item removed",
    data: cart,
  });
});
