const asyncHandler = require("../utils/asyncHandler");

const productService = require("../services/product.service");

exports.createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body, req);

  res.status(201).json({
    success: true,
    message: "Product Created Successfully",
    data: product,
  });
});

exports.getProducts = asyncHandler(async (req, res) => {
  const result = await productService.getProducts(req.query);

  res.status(200).json({
    success: true,
    ...result,
  });
});

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(
    req.params.id,
    req.body,
    req.files,
    req,
  );

  res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
    data: product,
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});
