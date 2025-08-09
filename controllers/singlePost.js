const Post = require('../models/postModel');
const fs = require('fs').promises;
const path = require('path');

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    res.json(post);
  } catch (error) {
    console.error('Ошибка при получении поста:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};






// exports.getSinglePost = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log('single id', id)
//         const singlePost = await Posts.findById(id);
//         console.log('single image', singlePost)
//         // const images = await Posts.find().sort({ createdAt: -1 });
//         // console.log('get images', images)

//         res.status(200).json(singlePost);
//     } catch (error) {
//         console.log('get error', error)
//         res.status(500).json({ error: error.message });
//     }
// };