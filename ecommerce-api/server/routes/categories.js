//server/routes/categories.js
const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory } = require('../controllers/categoryController');

// GET request to fetch all categories
router.get('/', getAllCategories);

// POST request to create a new category
router.post('/', createCategory);

module.exports = router;
