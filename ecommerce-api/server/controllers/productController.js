// server/controllers/productController.js
const mongoose = require('mongoose');
const path = require('path');
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

  // Image URL will be stored here
  let imageUrl = null;

  if (req.file) {
    // If an image was uploaded, get its URL
    imageUrl = path.join('uploads', req.file.filename); // You can store the relative path to the image
  }

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
      phoneNumber, // Include phone number
      image: imageUrl, // Store the image URL
    });
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};

    // If the image is provided, add it to the update data
    if (req.file) {
      updateData.image = req.file.path; // Assuming you're saving the file path
    }

    // Don't allow category and subcategory to be updated, only image or other fields.
    if (req.body.name) {
      updateData.name = req.body.name;
    }

    if (req.body.price) {
      updateData.price = req.body.price;
    }

    if (req.body.stock) {
      updateData.stock = req.body.stock;
    }

   // Ensure category and subcategory are not updated
    if (req.body.category || req.body.subcategory) {
      return res.status(400).json({ message: 'Category and Subcategory cannot be updated' });
    }

    // Update the product
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Product ID format' });
    }

    // Find the product and delete by ID
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
};
