const Posts = require('../models/postModel');
const fs = require('fs').promises;
const path = require('path');

exports.updatePost = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        const { id } = req.params;

        console.log('imageUrl update', imageUrl)
        console.log('id update', id)

  
        const updatedImages = await Posts.findByIdAndUpdate(id, { imageUrl: imageUrl }).sort({ createdAt: -1 });
        console.log('updatedImages', updatedImages);

        res.status(200).json(updatedImages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}