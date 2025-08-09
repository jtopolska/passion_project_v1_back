const mongoose = require('mongoose');

const updatePostSchema = new mongoose.Schema({
  content: String,
  category: String,
  tags: [String],
  author: String,
  publishDate: Date
}, { timestamps: true });

module.exports = mongoose.model('UpdatePost', updatePostSchema);