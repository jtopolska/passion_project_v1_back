const Admin = require('../models/adminModel.js');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: 'Неверные данные' });
  }
  const token = jwt.sign({ id: admin._id }, 'secret', { expiresIn: '1d' });
  res.json({ token });
};

exports.changePassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin || !(await admin.comparePassword(oldPassword))) {
    return res.status(401).json({ message: 'Неверный пароль' });
  }
  admin.password = newPassword;
  await admin.save();
  res.json({ message: 'Пароль обновлён' });
};
