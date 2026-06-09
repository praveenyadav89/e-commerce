const asyncHandler = require("../utils/asyncHandler");

const categoryService = require("../services/category.service");

exports.createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);

  res.status(201).json({
    success: true,
    message: "Category Created Successfully",
    data: category,
  });
});

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories();

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);

  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Category Updated Successfully",
    data: category,
  });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const childCategories = await categoryService.countDocuments(req.params.id);

  if (childCategories > 0) {
    throw new Error("Delete child categories first");
  }

  await categoryService.deleteCategory(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category Deleted Successfully",
  });
});
