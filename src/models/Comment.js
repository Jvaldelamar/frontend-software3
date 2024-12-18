// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  cardTitle: String,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
