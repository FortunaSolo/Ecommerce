//server/routes/subcategories.js
const express = require('express');
const router = express.Router();
const { getAllSubcategories, createSubcategory } = require('../controllers/subcategoryController');

// GET request to fetch all subcategories
router.get('/', getAllSubcategories);

// POST request to create a new subcategory
router.post('/', createSubcategory);

module.exports = router;
