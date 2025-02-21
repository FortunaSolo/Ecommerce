// server/controllers/productController.js

const Product = require('../models/Product');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

// Fetch all products with their category and subcategory names
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .populate('subcategory', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
// server/controllers/productController.js

// Create a new product
const createProduct = async (req, res) => {
  const { name, price, categoryId, subcategoryId, phoneNumber } = req.body;

  // Validate the provided categoryId and subcategoryId
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res.status(400).json({ message: 'Invalid subcategory ID' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Invalid category or subcategory ID format' });
  }

  // Create and save the new product
  try {
    const product = new Product({
      name,
      price,
      category: categoryId,
      subcategory: subcategoryId,
      phoneNumber,  // Include phone number
    });
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllProducts, createProduct };
