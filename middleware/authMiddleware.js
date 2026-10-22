// Backend/middleware/authMiddleware.js
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader === "Bearer sohail-secure-admin-token-2026") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "رسائی مسترد! یہ عمل صرف ایڈمن انجام دے سکتا ہے۔"
    });
  }
};

module.exports = { verifyAdmin };