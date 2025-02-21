const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controllers/productController');

// GET request to fetch all products
router.get('/', getAllProducts);

// POST request to create a new product
router.post('/', createProduct);

module.exports = router;
