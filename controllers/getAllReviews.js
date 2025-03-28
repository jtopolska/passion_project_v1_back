const Reviews = require('../models/reviewsModel');
const fs = require('fs').promises;
const path = require('path');

exports.getAllReviews = async (req, res) => {
    try {
      const images = await Reviews.find().sort({ createdAt: -1 });
      console.log('get images', images)

      res.status(200).json(images);
    } catch (error) {
      console.log('get error', error)
      res.status(500).json({ error: error.message });
    }
};