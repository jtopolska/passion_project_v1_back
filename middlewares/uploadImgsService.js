const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname);
    console.log('file', file)
    const ext = file.originalname.split('.').pop();
    console.log('ext', ext)
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
    cb(null, name);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post('/uploads/images', upload.single('image'), (req, res) => {
  // Если у тебя Nginx/прокси — baseURL лучше вынести в .env
  const baseURL = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
  const fileUrl = `${baseURL}/uploads/${req.file.filename}`;
  // Формат ответа, который ожидает TinyMCE
  res.json({ location: fileUrl });
});




// router.post('/upload', upload.single('file'), function (req, res) {
//   res.json({
//     url: `/uploads/${req.file.originalname}`
//   });
// });

module.exports = router;