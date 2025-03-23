// server/models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" }], // ✅ Add this line
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
