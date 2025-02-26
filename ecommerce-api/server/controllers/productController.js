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

// Fetch a single product by ID with its category and subcategory names
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('subcategory', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, price, categoryId, subcategoryId, phoneNumber, description } = req.body;

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
      description, // Add description here
      image: imageUrl, // Store the image URL
      user: req.user.id // Associate product with the user
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

    if (req.file) {
      updateData.image = req.file.path;
    }
    if (req.body.name) {
      updateData.name = req.body.name;
    }
    if (req.body.price) {
      updateData.price = req.body.price;
    }
    if (req.body.stock) {
      updateData.stock = req.body.stock;
    }
    if (req.body.description) {  // Allow updating description
      updateData.description = req.body.description;
    }
    if (req.body.category || req.body.subcategory) {
      return res.status(400).json({ message: 'Category and Subcategory cannot be updated' });
    }

    // Check if the product belongs to the logged-in user
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this product' });
    }

    // Update the product
    const updateProduct = await Product.findByIdAndUpdate(id, updateData, { new: true }); 
    res.json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a product by ID
// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    console.log('User:', req.user); // Check the user making the request
    console.log('Product ID:', req.params.id); // Check the product ID from the request

    const product = await Product.findById(req.params.id);
    console.log('Product:', product); // Check if the product was found

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the logged-in user is an admin or the owner of the product
    if (req.user.role !== 'admin' && product.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    // Proceed to delete the product
    await Product.findByIdAndDelete(req.params.id); // Use findByIdAndDelete instead of remove()
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete Product Error:', error); // Log the actual error
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  getAllProducts, 
  getProductById,
  createProduct, 
  updateProduct, 
  deleteProduct,
};
