const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Load model
const Post = require('../../models/Post');

// Validation
const validatePostInput = require('../../validation/post');

/**
* @route  GET api/posts/test
* @desc   Tests posts route
* @access Public
**/
router.get('/test', (req, res) => res.send({ msg: 'Posts Works' }));

/**
* @route  POST api/posts
* @desc   Create post
* @access Private
**/
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  // Validation create post inputs
  const { errors, isValid } = validatePostInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors)
  }

  // Create new post
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  })
    

  // Save post
  newPost.save().then(post => res.json(post));
})

module.exports = router;