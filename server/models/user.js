'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Promise = require('promise');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  created_at: String,
  karma: Number,
  submitted: Array  //this could be an array of ints of all posts by the user
});

userSchema.pre('save', function (next) {
  var today = new Date();
  if(!this.created_at){
    this.created_at = today;
  }

  next();
});

userSchema.methods.validPassword = (password, hash) => {

  return new Promise((resolve, reject) => {
    bcrypt.compare(password,  hash, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });

};



module.exports = mongoose.model('User', userSchema);
