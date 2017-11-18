'use strict';
const express = require('express');
const router = express.Router();
const postController = require('../dbController/postController');
const Post = require('./../models/apiPost');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Posts from simulator*/
router.post('/post', function(req, res, next){
  let postIn = req.body;
  let newPost = new Post({
    user_name: postIn.username,
    post_type: postIn.post_type,
    post_title: postIn.post_title,
    post_parent: postIn.post_parent,
    post_text: postIn.post_text,
    post_url: postIn.post_url,
    hanesst_id: postIn.hanesst_id,
    post_upvotes: 0,
    post_downvotes: 0,
    flagged: 0
  });


    newPost.save()
      .then((post) =>{
        if(post.post_parent !== -1){
          Post.find({hanesst_id: post.post_parent}).then((parentPost) =>{
            parentPost[0].comments.push(post.hanesst_id);
            parentPost[0].save().then((savedParent) =>{
              res.status(200).send();
            });
          });
        } else {
          res.send(200).send();
        }
      })
      .catch((err) =>{
        res.send(400);
      })
});

/* Gets the highest hanesst_id*/
router.get('/latest', function(req, res, next){
  Post.find({hanesst_id: {$gt: 0}}).sort({'created_at': -1}).limit(1).exec()
      .then((latest)=> {
        console.log(latest[0].hanesst_id);
        res.status(200);
        res.send(latest[0].hanesst_id + '');
      })
      .catch((err) =>{
        res.sendStatus(404);
      });

});
module.exports = router;
