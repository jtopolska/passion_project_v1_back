const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), function (req, res) {
  res.json({
    url: `/uploads/${req.file.originalname}`
  });
});

module.exports = router;