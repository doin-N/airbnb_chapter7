const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'temp' });

router.post('/upload', upload.array('photos', 100), async (req, res) => {
  try {
    let imageArray = [];
    for (let i = 0; i < req.files.length; i++) {
      let { path } = req.files[i];
      const result = await cloudinary.uploader.upload(path, {
        folder: 'Airbnb/Places',
      });
      imageArray.push(result.secure_url);
    }
    res.status(200).json(imageArray);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: 'Internal Server Error : 서버에 오류났어요.',
    });
  }
});

router.use('/user', require('./user'));
router.use('/places', require('./place'));
router.use('/booking', require('./booking'));

module.exports = router;
