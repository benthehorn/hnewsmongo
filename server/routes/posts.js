'use strict';
const express = require('express');
const router = express.Router();
const postController = require('../dbController/postController');
const userController = require('../dbController/userController');
const User = require('./../models/user');
const Post = require('./../models/apiPost');
/* Fetch the numberOfPost recent posts*/
router.get('/lastPosted/:numberOfPosts', function(req, res, next){

  let numberOf = parseInt(req.params.numberOfPosts);
  Post.find({post_parent: -1}).sort({'created_at': -1}).limit(numberOf).exec().then((posts) =>{
    let result = JSON.stringify(posts);
      res.send(result);
      res.status(200);
  })
    .catch((err) =>{
      res.status(400).send();
    });
});

/* Post a new story/comment/pollopt*/
router.post('/new', function(req, res, next){
  console.log(req.body.username);
  User.findOne({username: req.body.username}).then((user) =>{
    let newPost = new Post({
      user_name: req.body.username,
      post_type: req.body.post_type,
      post_title: req.body.post_title,
      post_parent: req.body.post_parent,
      post_text: req.body.post_text,
      post_upvotes: 0,
      post_downvotes: 0,
      post_flagged: 0
    });

    newPost.save().then((post) =>{
      if(post.post_parent !== -1){
        Post.find({post_id: post.post_parent}).then((parentPost) =>{
          parentPost[0].comments.push(post.post_id);
          parentPost[0].save().then((savedParent) =>{
            res.status(200).send();
          });
        });
      } else {
        res.status(200).send();
      }
    });

    }).catch((err) =>{
          res.status(400).send();

  });
});


module.exports = router;