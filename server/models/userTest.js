/*
  'use strict';
const User = require('./user');


 const testUser =  new User({
   username: 'Test3',
   password: 'Test3'
  });

   testUser.save()
       .then(function(user){
        console.log('user created :', user);

      });

  return User.findOne({username: 'Test2'})
      .then((user) => {
        console.log(user);
    return testUser.validPassword('Test2', user.password)
        .then((result) => {
          console.log('Correct password : ', result);
        });
      });

*/
