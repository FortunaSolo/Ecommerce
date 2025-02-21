// server/models/Product.js
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  phoneNumber: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
