const Product = require("../models/Product");
const Category = require("../models/Category");
const slugify = require("slugify");
const { generateFileUrl } = require("../utils/fileName");
const DEFAULT_PRODUCT_IMAGE =
  process.env.DEFAULT_PRODUCT_IMAGE || "uploads/default/default-product.jpg";

exports.createProduct = async (payload, req) => {
  const { name, sku, category } = payload;

  const categoryExists = await Category.findById(category);

  if (!categoryExists) {
    throw new Error("Category not found");
  }

  const slug = slugify(name, {
    lower: true,
  });

  const exists = await Product.findOne({
    sku,
  });

  if (exists) {
    throw new Error("Product already exists");
  }

  const images = req.files?.length
    ? req.files.map((file) => generateFileUrl(req, file))
    : [DEFAULT_PRODUCT_IMAGE];

  return await Product.create({
    ...payload,
    slug,
    sku,
    images,
  });
};

exports.getProductById = async (id) => {
  return await Product.findById(id, { isDeleted: false }).populate(
    "category",
    "name",
  );
};

exports.updateProduct = async (id, payload, files, req) => {
  const existingProduct = await Product.findById(id);

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  if (payload.sku) {
    const skuExists = await Product.findOne({
      sku: payload.sku,
      _id: { $ne: id },
    });

    if (skuExists) {
      throw new Error("SKU already exists");
    }
  }

  if (payload.name) {
    payload.slug = slugify(payload.name, {
      lower: true,
    });
  }

  if (files && files.length > 0) {
    existingProduct.images.forEach((imageUrl) => {
      const imagePath = imageUrl.split(req.get("host") + "/")[1];

      if (imagePath) {
        const fullPath = path.join(process.cwd(), imagePath);

        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
    });
    payload.images = files.map(
      (file) =>
        `${req.protocol}://${req.get("host")}/${file.path.replace(/\\/g, "/")}`,
    );
  } else {
    payload.images = existingProduct.images;
  }

  return await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

exports.deleteProduct = async (id) => {
  return await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
};

exports.getProducts = async (queryParams) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    sort = "-createdAt",
  } = queryParams;

  const filter = {
    isDeleted: false,
  };

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (category) {
    filter.category = category;
  }

  const products = await Product.find(filter)
    .populate("category", "name")
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Product.countDocuments(filter);

  return {
    products,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  };
};
