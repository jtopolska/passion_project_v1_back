const Tag = require('../models/tagModel');

exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
