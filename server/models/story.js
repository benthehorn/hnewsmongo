const mongoose = require('mongoose');
//const Comment = require('./comment');

const storySchema = mongoose.Schema({
  username: String,
  descendants: Number,
  kids: Array,
  score: Number,
  created_at: String,
  title: String,
  post_type: String, //story
  url: String,

});

module.exports = mongoose.model('Story', storySchema);
