//ecommerce-api/server/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register a new user
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({ name, email, password});
        await user.save();

        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              profilePicture: user.profilePicture,
              role: user.role,
            },
          });
          console.log("Raw Password:", password);
          console.log("Hashed Password:", hashedPassword);
          
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Login user
const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check user existence
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found in DB");
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      // Compare password correctly
      const isMatch = await user.comparePassword(password);

console.log("Password Match:", isMatch);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      

      // Generate token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          role: user.role,
        },
      });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
    
};

const getUserProfile = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized" });
      }
  
      // Find the user and exclude the password field
      const user = await User.findById(req.user._id).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  // In ecommerce-api/server/controllers/authController.js
const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;
  
  try {
      // Check if the user exists
      let user = await User.findById(req.user._id);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Update the user's profile fields
      user.name = name || user.name;
      user.email = email || user.email;

      // Save the updated user to the database
      await user.save();

      res.json({
          message: 'Profile updated successfully',
          user: {
              id: user._id,
              name: user.name,
              email: user.email,
              profileImage: user.profileImage,
              role: user.role,
          },
      });
  } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
