  'use strict';
const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  var countSchema = new Schema({
  _id: {type: String, required: true},
  seq: {type: Number, default: 0}
});

var counter = mongoose.model('counter' , countSchema);

const apiPostSchema = new Schema({
  post_id: String,
  user_name: String,
  post_type: String,
  pwd_hash: String,
  post_title: String,
  post_url: String,
  post_parent: Number,
  hanesst_id: Number,
  post_text: String,
  post_upvotes: Number,
  post_downvotes: Number,
  flagged: Number,
  score: Number,
  created_at: Date,
  updated_at: Date,
  comments: {type: []}  //number of comments , comments.length
});



apiPostSchema.pre('save', function(next) {
  var today = new Date();
  this.updated_at = today;
  if(!this.created_at){
    this.created_at = today;
  }
  this.score = this.post_upvotes - this.post_downvotes;

  var post = this;
  if(post.post_id){
    next();
  } else {
    counter.findByIdAndUpdate({_id:'postingID'}, {$inc: {seq: 1}}, {new: true, upsert: true})
      .then(function(countUp){
        post.post_id = countUp.seq + "";
        next();
      }).catch(function(err) {
      console.error(err);
    });
  }
});

module.exports = mongoose.model('Post', apiPostSchema);