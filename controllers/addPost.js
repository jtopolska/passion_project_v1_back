const Posts = require('../models/postModel');
const fs = require('fs').promises;
const path = require('path');

exports.addPost = async (req, res) => {
    try {
      const { imageUrl } = req.body;
      console.log('add imageUrl', imageUrl)
  
      if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
        return res.status(400).json({ error: 'Invalid imageUrl' });
      }
  
      const newImage = new Posts({ imageUrl });
      console.log('newImage', newImage)
  
      await newImage.save();
  
      const images = await Posts.find().sort({ createdAt: -1 });
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};