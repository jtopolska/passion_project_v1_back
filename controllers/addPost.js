const Post = require('../models/postModel');
const Category = require('../models/categoryModel');
const Tag = require('../models/tagModel');
const Author = require('../models/authorModel');

exports.addPost = async (req, res) => {
  try {
    const { content, category, tags, author, publishDate } = req.body;

    if (!content || !category || !author || !publishDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 🔹 Категория
    let categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      categoryDoc = await Category.create({ name: category });
    }

    // 🔹 Автор
    let authorDoc = await Author.findOne({ name: author });
    if (!authorDoc) {
      authorDoc = await Author.create({ name: author });
    }

    // 🔹 Теги
    const tagDocs = [];
    for (const tagName of tags) {
      let tagDoc = await Tag.findOne({ name: tagName });
      if (!tagDoc) {
        tagDoc = await Tag.create({ name: tagName });
      }
      tagDocs.push(tagDoc.name);
    }

    // 📝 Создание поста
    const newPost = await Post.create({
      content,
      category: categoryDoc.name,
      tags: tagDocs,
      author: authorDoc.name,
      publishDate
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// const Posts = require('../models/postModel');
// const fs = require('fs').promises;
// const path = require('path');

// exports.addPost = async (req, res) => {
//     try {
//       const { imageUrl } = req.body;
//       console.log('add imageUrl', imageUrl)
  
//       if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
//         return res.status(400).json({ error: 'Invalid imageUrl' });
//       }
  
//       const newImage = new Posts({ imageUrl });
//       console.log('newImage', newImage)
  
//       await newImage.save();
  
//       const images = await Posts.find().sort({ createdAt: -1 });
//       res.status(200).json(images);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
// };