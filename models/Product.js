// Backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // 'gaming', 'gadgets', 'fashion'
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '🎮' }, // Emoji یا Image URL
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);