const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');

// Fetch all subcategories with their parent category names
const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category', 'name');
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new subcategory
const createSubcategory = async (req, res) => {
  const { name, categoryId } = req.body;

  // Validate the provided categoryId
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Invalid category ID format' });
  }

  // Create and save the new subcategory
  try {
    const subcategory = new Subcategory({
      name,
      category: categoryId,
    });
    const newSubcategory = await subcategory.save();
    res.status(201).json(newSubcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllSubcategories, createSubcategory };
