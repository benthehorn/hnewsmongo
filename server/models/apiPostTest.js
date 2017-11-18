/*'use strict';
const mongoose = require('mongoose');
const Promise = require('promise');
const connection = 'mongodb://localhost:27017/mongoose-bcrypt-test';
const storyTypes = require('./../enums/postType');
const Post = require('./apiPost');

mongoose.Promise = global.Promise;
mongoose.connect(connection, function(err, res){
  if (err) {

    console.log('error');
    console.log(err);
    reject(err);
  } else {


    console.log('connected to MONGO DB');

  }
});*/


