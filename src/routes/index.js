const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");

const userRoutes = require("./user.routes");

const categoryRoutes = require("./category.routes");

const productRoutes = require("./product.routes");

const cartRoutes = require("./cart.routes");

const orderRoutes = require("./order.routes");

const dashboardRoutes = require("./dashboard.routes");

const roleRoutes = require("./role.routes");

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/categories", categoryRoutes);

router.use("/products", productRoutes);

router.use("/cart", cartRoutes);

router.use("/orders", orderRoutes);

router.use("/admin", dashboardRoutes);

router.use("/roles", roleRoutes);

module.exports = router;
