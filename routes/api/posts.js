const express = require('express');
const router = express.Router();

/**
* @route  api/posts/test
* @desc   Tests posts route
* @method Public
**/
router.get('/test', (req, res) => res.send({ msg: 'Posts Works' }));

module.exports = router;