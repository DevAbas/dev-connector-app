const express = require('express');
const router = express.Router();

/**
* @route  api/profile/test
* @desc   Tests profile route
* @method Public
**/
router.get('/test', (req, res) => res.send({ msg: 'Profile Works' }));

module.exports = router;