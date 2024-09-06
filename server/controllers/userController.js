const User = require('../models/User');
const cookieToken = require('../utils/cookieToken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        message: '이름, 이메일, 비밀번호를 모두 입력하세요.',
      });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: '이미 가입된 유저입니다.',
      });
    }
    user = await User.create({ name, email, password });
    cookieToken(user, res);
  } catch (error) {
    console.error('에러 발생:', error);
    res.status(500).json({
      message: '서버 내부 오류가 발생했습니다.',
      error: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: '이메일이나 비밀번호를 입력하세요.' });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '가입되지 않은 유저입니다.' });
    }
    const isPasswordCorrect = await user.isValidatedPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: '유효하지 않은 비밀번호입니다.',
      });
    }
    cookieToken(user, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: '서버 오류입니다.',
      error: error,
    });
  }
};
