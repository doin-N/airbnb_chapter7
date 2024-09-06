const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

//http://localhost:4000/user/register Post
router.route('/register').post(register);
// router.post('/register', register);
// 아래랑 무슨 차이인지 잘모르겠지만 아래처럼해도 똑같이 동작함
router.route('/login').post(login);

module.exports = router;
