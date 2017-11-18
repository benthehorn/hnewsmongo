  "use strict";
const express = require('express');
const router = express.Router();
const Promise = require('promise')
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
  const bcrypt = require('bcryptjs');
  const handler = require('../handlers/taste');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Register new users */
router.post('/register', (req, res, next) => {
  const user = req.body;
  let newUser = new User({
    username: user.username,
    password: bcrypt.hashSync(user.password, handler.salt),
    karma: 0,
    submitted: []
  });

  newUser.save().then((result) =>{
    console.log('user : ', result);
    res.status(200).send(jwt.sign(user, handler.secret));
  }).catch((err) =>{
    res.status(400).send();
    console.log(err);
  });

});

/* Log in a user*/
router.post('/login', (req, res, next) =>{
  const user = req.body;
  return User.findOne({username: user.username}).then((result) =>{
    if(result){

    if(user.validPassword(user.password, result.password)){
      res.status(200).send(jwt.sign(user, handler.secret));
    } else {
      res.status(401).send({msg: 'Wrong Username or Password'});
    }
    } else {
      res.status(401).send({msg: 'Username Not Recognised'});
    }
  }).catch((err) =>{
    res.status(400).send({mgg: 'Empty Body'});
  })
});

module.exports = router;
