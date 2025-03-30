const Posts = require('../models/postModel');
const fs = require('fs').promises;
const path = require('path');

exports.getAllPosts = async (req, res) => {
    try {
      const images = await Posts.find().sort({ createdAt: -1 });
      console.log('get images', images)

      res.status(200).json(images);
    } catch (error) {
      console.log('get error', error)
      res.status(500).json({ error: error.message });
    }
};