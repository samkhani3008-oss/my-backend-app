// Backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sohail Enterprise API is running...');
});

// ۱. اتھنٹیکیشن روٹس (ایڈمن اور یوزر لاگ ان / سائن اپ کے لیے)
const authRoutes = require('./routes/authRoutes');
app.use('/api/v1/auth', authRoutes);

// ۲. پروڈکٹ روٹس (MongoDB سے پروڈکٹس لانے اور ایڈ کرنے کے لیے)
const productRoutes = require('./routes/productRoutes');
app.use('/api/v1/products', productRoutes);

// ۳. آرڈر روٹس
app.post('/api/v1/orders', async (req, res) => {
  try {
    const Order = require('./models/Order');
    const { cartItems, customerInfo, totalAmount } = req.body;
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    const newOrder = await Order.create({
      orderId,
      customerInfo,
      cartItems,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      orderId,
      data: newOrder,
      message: 'Order created successfully and saved to MongoDB!',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/v1/orders', async (req, res) => {
  try {
    const Order = require('./models/Order');
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Sohail Enterprise Server active on Port ${PORT}`);
});