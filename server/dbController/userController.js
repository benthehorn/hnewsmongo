'use strict';

const User = require('./../models/user');

/* Find a single user by name*/
var getUserByName = function(username, callback){
   User.find({username: username}, function(err, user){
     if(err || user.length === 0){
       callback(false);
     } else {
       callback(user[0]);
     }
   });

};

module.exports = {
  getUserByName: getUserByName
} ;
