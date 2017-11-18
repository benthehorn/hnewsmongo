'use strict';
const Post = require('../models/apiPost');
const User = require('../models/user');
const storyTypes = require('./../enums/postType');

var insertOurPost = function(userName, postType, postTitle, postParent, postText, callback){
  var newPost = Post({
    user_name: userName,
    post_type: postType,
    post_title: postTitle,
    post_parent: postParent,
    post_text: postText,
    post_upvotes: 0,
    post_downvotes: 0,
    post_flagged: 0
  });

  newPost.save(function(err, post){
    if(err){
      callback(false);
    }else {
      if(newPost.post_parent !== -1){
        insertComments(post, function(result) {
          if(result == false){
            callback(false);
          } else {
            callback(true);
          }
        });
      }
      else {
        callback(true);
      }
    }
  });
};

var simulatorPost = function(userName, postType, pwd_hash, postTitle, post_url, postParent, hanesst_id, postText, callback){
  var newPost = new Post({
    user_name: userName,
    post_type: postType,
    post_title: postTitle,
    post_parent: postParent,
    post_text: postText,
    post_url: post_url,
    hanesst_id: hanesst_id,
    post_upvotes: 0,
    post_downvotes: 0,
    flagged: 0
  });

  newPost.save(function(err, post){
    if(err){
      callback(false);
    } else {
      callback(true);
    }
  });

};

var getLatest = function(){
  Post.find({hanesst_id: {$gt: 0}}).sort({'created_at': -1}).limit(1).exec()
    .then((latest)=> {
      return latest[0].hanesst_id;
    })
    .catch((err) =>{
      return err;
    });
};

var getMostRecent = function(numberOfPosts){
  let numberOf = parseInt(numberOfPosts);
    Post.find({post_parent: -1}).sort({'created_at' : -1}).limit(numberOf).exec().then((posts) =>{
      return posts;
    });
};

var insertComments = function(postIn, callback){
  Post.find({ post_id: postIn.post_parent}, function(err, postParent){
    console.log('insert : ', postParent);
    if(err || postParent.length == 0){
      callback(false);
    } else {
      postParent[0].comments.push(postIn.post_id);
      postParent[0].save(function(err){
        if(err){
          callback(err);
        } else {
          callback(true);
        }
      });

    }
  });
};

module.exports = {
  simulatorPost: simulatorPost,
  getLatest: getLatest,
  getMostRecent: getMostRecent,
  insertComments: insertComments,
  insertOurPost: insertOurPost
};
