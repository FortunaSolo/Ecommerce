// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  image: { type: String, required: true },  // To store the image URL
  description: { type: String },  // For product description
  stock: { type: Number},  // For stock
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
