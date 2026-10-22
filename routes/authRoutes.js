// Backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 1. ایڈمن لاگ ان روٹ (پہلے سے موجود ہے)
router.post('/login', authController.loginAdmin);

// 2. یوزر رجسٹریشن اور لاگ ان روٹس (نیا اضافہ)
router.post('/register', authController.registerUser);
router.post('/user-login', authController.loginUser);

module.exports = router;