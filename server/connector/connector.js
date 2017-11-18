

    'use strict';
let Promise = require('promise');
let mongoose = require('mongoose');

var db;

getdb();

function getdb() {
  return new Promise(function (fulfill, reject) {

    var connectionString = 'mongodb://localhost:27017/mongoose-bcrypt-test';
    console.log(connectionString);
    mongoose.Promise = global.Promise;
    mongoose.connect(connectionString, function (err, res) {
      if (err) {

        console.log('error');
        console.log(err);
        reject(err);
      } else {
        db = res;

        console.log('connected to MONGO DB');
        fulfill(db);

      }
    });

  });
}

