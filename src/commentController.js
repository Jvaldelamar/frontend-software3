// controllers/commentController.js
const Comment = require('../models/Comment');

const createComment = async (req, res) => {
  const { cardTitle, comment } = req.body;
  try {
    const newComment = new Comment({ cardTitle, comment });
    await newComment.save();
    res.status(201).json({ message: 'Comentario guardado', data: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el comentario', error });
  }
};

module.exports = { createComment };
