// Backend/controllers/authController.js

// عارضی یوزر ڈیٹا بیس (یا آپ کا ماڈل)
let usersList = [];

// 1. ایڈمن لاگ ان (آپ کا پرانا کوڈ)
exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  const ADMIN_EMAIL = "samkhani3008@gmail.com";
  const ADMIN_PASSWORD = "Bannu1122";

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.status(200).json({
      success: true,
      message: "ایڈمن لاگ ان کامیاب ہو گیا ہے!",
      user: {
        name: "سہیل (Admin)",
        email: ADMIN_EMAIL,
        role: "admin"
      },
      token: "sohail-secure-admin-token-2026"
    });
  }

  return res.status(401).json({
    success: false,
    message: "غلط ای میل یا پاسورڈ! صرف مجاز ایڈمن لاگ ان ہو سکتا ہے۔"
  });
};

// 2. یوزر رجسٹریشن (Register)
exports.registerUser = (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = usersList.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: "یہ ای میل پہلے ہی رجسٹرڈ ہے!" });
    }

    const newUser = { id: `user_${Date.now()}`, name, email, password, role: "user" };
    usersList.push(newUser);

    res.status(201).json({
      success: true,
      message: "اکاؤنٹ کامیابی سے بن گیا ہے!",
      user: { name: newUser.name, email: newUser.email, role: "user" }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. یوزر لاگ ان (User Login)
exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    const user = usersList.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ success: false, message: "غلط ای میل یا پاسورڈ!" });
    }

    res.status(200).json({
      success: true,
      message: "لاگ ان کامیاب ہو گیا ہے!",
      user: { name: user.name, email: user.email, role: "user" },
      token: `user-token-${Date.now()}`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};