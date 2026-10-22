// Backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ۱. تمام پروڈکٹس حاصل کرنے کا روٹ (GET)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ۲. نیا پروڈکٹ ایڈ کرنے کا روٹ (POST - Admin کے لیے)
router.post('/', async (req, res) => {
  try {
    const { name, category, price, description, image } = req.body;
    const newProduct = await Product.create({
      name,
      category,
      price,
      description,
      image,
    });
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;