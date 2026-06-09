const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cart.controller");

const { protect } = require("../middlewares/auth.middleware");

router.post("/", protect, cartController.addToCart);

router.get("/", protect, cartController.getCart);

router.put("/:productId", protect, cartController.updateCartItem);

router.delete("/:productId", protect, cartController.removeCartItem);

module.exports = router;
