const express = require('express');
const { addPlace } = require('../controllers/placeController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const router = express.Router();

router.route('/new').post(isLoggedIn, addPlace);

module.exports = router;
