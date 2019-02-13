const express  = require('express');
const router   = express.Router();
const gravatar = require('gravatar');
const bcrypt   = require('bcryptjs');
// Load User model 
const User = require('../../models/User');

/**
* @route  api/users/test
* @desc   Tests users route
* @access Public
**/
router.get('/test', (req, res) => res.send({ msg: 'Users Works' }));

/**
* @route  POST api/users/register
* @desc   Register user
* @access Public
**/
router.post('/register', (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if(user) {
        return res.status(400).json({ email: 'Email alredy exists' })
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg',  // Rating
          d: 'mm'   // Default
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          });
        });
      }
    })
    .catch(err => console.log(err))
  })

module.exports = router;