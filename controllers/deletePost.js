const Posts = require('../models/postModel');
const fs = require('fs').promises;
const path = require('path');

exports.deletePostById = async (req, res) => {
    try {
      console.log('req.params', req.params)
      const { id } = req.params;
      console.log('del id', id)
      const image = await Posts.findById(id);
      console.log('del image', image)
  
      // if (!image) {
      //   return res.status(404).json({ error: 'Image not found' });
      // }
  
      // const imagePath = path.join(__dirname, '..', 'uploads', image.imageUrl);
  
      // try {
      //   await fs.unlink(imagePath);
      // } catch (err) {
      //   return res.status(500).json({ error: err.message });
      // }
  
      const check = await Posts.findByIdAndDelete(id);
      console.log('check', check);
  
      const images = await Posts.find().sort({ createdAt: 1 });
      res.status(200).json({ message: 'Image deleted successfully', images });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};