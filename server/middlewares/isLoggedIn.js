const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isLoggedIn = async (req, res, next) => {
  const token =
    req.cookies.token || req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({
      success: false,
      message: '로그인부터 하세요옹~',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'invalide token',
    });
  }
};
