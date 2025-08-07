const Author = require('../models/authorModel');

exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ name: 1 });
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
