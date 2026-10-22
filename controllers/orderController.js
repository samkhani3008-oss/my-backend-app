// Backend/controllers/orderController.js
const Order = require('../models/Order');

exports.processOrder = async (req, res, next) => {
  try {
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
    next(error);
  }
};