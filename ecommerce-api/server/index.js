const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');



// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable all CORS requests (adjust as necessary)
app.use(cors()); 

// Set up static file serving
app.use('/uploads', express.static('uploads'));
console.log('Serving static files from:', path.join(__dirname, 'uploads'));


// Import routes
const categoryRoutes = require('./routes/categories');
const subcategoryRoutes = require('./routes/subcategories');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
