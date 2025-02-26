const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token and get user info
const protect = async (req, res, next) => {
    let token;
  
    // Check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];  // Get token from 'Bearer <token>'
  
        // Decode and verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
  
        // Attach user to the request object
        req.user = await User.findById(decoded.id); // Assuming the JWT contains the user ID
        next();  // Proceed to next middleware or route handler
      } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }
  
    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
  
  // Authorize middleware
 const authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      next();  // User is authorized, proceed to next middleware/route handler
    };
  };

// Middleware to check user role

module.exports = { protect, authorize };
