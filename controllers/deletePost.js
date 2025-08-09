const Post = require('../models/postModel');
const fs = require('fs').promises;
const path = require('path');

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    // Удаление изображений (предположим, post.images — массив путей)
    if (post.images && post.images.length > 0) {
      post.images.forEach((imgPath) => {
        const fullPath = path.join('public', imgPath); // или абсолютный путь
        fs.unlink(fullPath, (err) => {
          if (err) console.error(`Ошибка удаления файла ${fullPath}:`, err);
        });
      });
    }

    await Post.findByIdAndDelete(id);
    res.json({ message: 'Пост и изображения удалены' });
  } catch (error) {
    console.error('Ошибка при удалении поста:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};









// exports.deletePostById = async (req, res) => {
//     try {
//       console.log('req.params', req.params)
//       const { id } = req.params;
//       console.log('del id', id)
//       const image = await Posts.findById(id);
//       console.log('del image', image)
  
//       // if (!image) {
//       //   return res.status(404).json({ error: 'Image not found' });
//       // }
  
//       // const imagePath = path.join(__dirname, '..', 'uploads', image.imageUrl);
  
//       // try {
//       //   await fs.unlink(imagePath);
//       // } catch (err) {
//       //   return res.status(500).json({ error: err.message });
//       // }
  
//       const check = await Posts.findByIdAndDelete(id);
//       console.log('check', check);
  
//       const images = await Posts.find().sort({ createdAt: 1 });
//       res.status(200).json({ message: 'Image deleted successfully', images });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// };