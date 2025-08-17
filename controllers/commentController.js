const Comment = require('../models/commentModel.js');
const bcrypt = require('bcrypt');

exports.createComment = async (req, res) => {
  const { postId } = req.params;
  const { name, email, password, content } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const comment = await Comment.create({ postId, name, email, password: hashed, content });
  res.json(comment);
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { password, content } = req.body;
  const comment = await Comment.findById(id);
  if (!comment || !(await bcrypt.compare(password, comment.password))) {
    return res.status(403).json({ message: 'Нет доступа' });
  }
  comment.content = content;
  await comment.save();
  res.json(comment);
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const comment = await Comment.findById(id);
  if (!comment || !(await bcrypt.compare(password, comment.password))) {
    return res.status(403).json({ message: 'Нет доступа' });
  }
  await comment.deleteOne();
  res.json({ message: 'Комментарий удалён' });
};

exports.adminDeleteComment = async (req, res) => {
  const { id } = req.params;
  await Comment.findByIdAndDelete(id);
  res.json({ message: 'Удалено админом' });
};

exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId });
  res.json(comments);
};
