const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');


// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Protected routes
router.post('/', protect, authorize('user', 'admin'), upload.single('image'), productController.createProduct);
router.put('/:id', protect, authorize('user', 'admin'), upload.single('image'), productController.updateProduct);
router.delete('/:id', protect, authorize('user', 'admin'), productController.deleteProduct);


/*
// GET request to fetch all products
router.get('/', getAllProducts);

// POST request to create a new product
router.post('/', upload.single('image'), productController.createProduct);

// PUT request for Updating a Product
router.put('/:id', upload.single('image'), productController.updateProduct);

// DELETE Route for Deleting a Product
router.delete('/:id', deleteProduct); // Add this route

*/

module.exports = router;
