const Comment = require('../models/commentModel.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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

exports.getCommentUsers = async (req, res) => {
  try {
    const users = await Comment.find({}, 'nickname email password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении пользователей', error: err.message });
  }
};

exports.resetCommentPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const comment = await Comment.findOne({ email });
    if (!comment) return res.status(404).json({ message: 'Комментарий с таким email не найден' });

    const newPassword = crypto.randomBytes(4).toString('hex'); // 8 символов
    comment.password = newPassword;
    await comment.save();

    // Отправка письма
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Новый пароль для редактирования комментария',
      text: `Ваш новый пароль: ${newPassword}`
    });

    res.status(200).json({ message: 'Новый пароль отправлен на почту' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при сбросе пароля', error: err.message });
  }
};