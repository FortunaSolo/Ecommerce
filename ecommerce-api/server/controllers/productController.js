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

// Update a product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, phoneNumber, categoryId, subcategoryId } = req.body;

  try {
    // Check if the product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Validate the category and subcategory IDs
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
    }

    if (subcategoryId) {
      const subcategory = await Subcategory.findById(subcategoryId);
      if (!subcategory) {
        return res.status(400).json({ message: 'Invalid subcategory ID' });
      }
    }

    // Update the product's fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.phoneNumber = phoneNumber || product.phoneNumber;
    product.category = categoryId || product.category;
    product.subcategory = subcategoryId || product.subcategory;

    // Save the updated product
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts, createProduct, updateProduct, // Add this line
};
