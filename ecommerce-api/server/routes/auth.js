//ecommerce-api\server\routes\auth.js
const express = require('express');
const { check } = require('express-validator');
const {
    registerUser,  
    loginUser,     
    getUserProfile,  
  } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// User Registration Route
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    registerUser
);

// User Login Route
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    loginUser
);

const { updateUserProfile } = require("../controllers/authController");

// Add a route to update user profile
router.put("/me", protect, updateUserProfile);


// Protected route to get logged-in user's profile
router.get("/me", protect, getUserProfile);

module.exports = router;
