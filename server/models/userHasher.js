//this will install hell yeahs users, with a salt of 1..
'use strict';
const mongoose = require('mongoose');
const User = require('./user');
const Promise = require('promise');
const connection = 'mongodb://localhost:27017/mongoose-bcrypt-test';
const fs = require('fs');

const lineReader = require('line-reader');
let count1 = 0;

mongoose.Promise = global.Promise;
mongoose.connect(connection, function(err, res){
  if (err) {

    console.log('error');
    console.log(err);
    reject(err);
  } else {


    console.log('connected to MONGO DB');

  }
});

lineReader.eachLine('usersAll.csv', function(line, last){
  var info = line.split(',');
  if(info[0] == 'user');
  else {
    var userObject = new User({
    username: info[0],
    password: info[1],
    karma: 0,
    submitted: []

    });
    count1 ++;
    console.log(count1);
    insert(userObject);
  }

  if(last){
    console.log('last : ', last);
  }

});

function insert(user){
  user.save()
      .then(function(user){
        console.log('inserted : ', user.username);

      });
}

