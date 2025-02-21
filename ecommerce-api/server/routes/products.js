const express = require('express');
const router = express.Router();
const { 
    getAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
} = require('../controllers/productController');

// GET request to fetch all products
router.get('/', getAllProducts);

// POST request to create a new product
router.post('/', createProduct);

// PUT request for Updating a Product
router.put('/:id', updateProduct);

// DELETE Route for Deleting a Product
router.delete('/:id', deleteProduct); // Add this route

module.exports = router;
