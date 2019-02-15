const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load models
const User = require('../../models/User');
const Profile = require('../../models/Profile');

/**
* @route  GET api/profile/test
* @desc   Tests profile route
* @access Public
**/
router.get('/test', (req, res) => res.send({ msg: 'Profile Works' }));

/**
* @route  GET api/profile
* @desc   Get user's profile
* @access Private
**/
router.get(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if(!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors)
        }
        return res.json(profile)
      })
      .catch(err => res.status(404).json(err))
  }
)

module.exports = router;