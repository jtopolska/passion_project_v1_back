const Reviews = require('../models/reviewsModel');
const fs = require('fs').promises;
const path = require('path');

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