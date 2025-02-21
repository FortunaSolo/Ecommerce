const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import routes
const categoryRoutes = require('./routes/categories');
const subcategoryRoutes = require('./routes/subcategories');
const productRoutes = require('./routes/products');

// Use routes
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/products', productRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
