const slugify = require("slugify");

const Category = require("../models/Category");

exports.createCategory = async (payload) => {
  const { name, parentCategory, description } = payload;

  const slug = slugify(name, {
    lower: true,
  });

  const exists = await Category.findOne({
    slug,
  });

  if (exists) {
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name,
    slug,
    parentCategory,
    description,
  });

  return category;
};

exports.getCategories = async () => {
  return await Category.find({ isActive: true }).populate(
    "parentCategory",
    "name",
  );
};

exports.getCategoryById = async (id) => {
  return await Category.findById(id, { isActive: true }).populate(
    "parentCategory",
    "name",
  );
};

exports.updateCategory = async (id, payload) => {
  const { name } = payload;

  const slug = slugify(name, {
    lower: true,
  });

  return await Category.findByIdAndUpdate(
    id,
    {
      ...payload,
      slug,
    },
    {
      new: true,
    },
  );
};
//soft delete
exports.deleteCategory = async (id) => {
  return await Category.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true },
  );
};

exports.countDocuments = async (id) => {
  return await Category.countDocuments({ parentCategory: id });
};
