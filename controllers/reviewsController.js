const Reviews = require('../models/reviewsModel');
const fs = require('fs').promises;
const path = require('path');

exports.getAllReviews = async (req, res) => {
    try {
      const images = await Reviews.find().sort({ createdAt: -1 });

      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.addReviews = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
      return res.status(400).json({ error: 'Invalid imageUrl' });
    }

    const newImage = new Reviews({ imageUrl });

    await newImage.save();

    const images = await Reviews.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Reviews.findById(id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const imagePath = path.join(__dirname, '..', 'uploads', image.imageUrl);

    try {
      await fs.unlink(imagePath);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    await Reviews.findByIdAndDelete(id);

    const images = await Reviews.find().sort({ createdAt: 1 });
    res.status(200).json({ message: 'Image deleted successfully', images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};