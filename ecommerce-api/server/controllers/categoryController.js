//server/controllers/categotyController.js
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories"); // ✅ Fixed population
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllCategories, createCategory };
