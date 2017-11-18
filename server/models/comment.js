const mongoose = require('mongoose');

const commentSchema = mongoose.model({
  username: String,
  id: Number,
  kids: Array,
  parent: Number,
  text: String,
  created_at: String,//comment
  post_type: String
});

module.exports = mongoose.model('Comment', commentSchema);