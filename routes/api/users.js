const express = require('express');
const router = express.Router();

/**
* @route  api/users/test
* @desc   Tests users route
* @method Public
**/
router.get('/test', (req, res) => res.send({ msg: 'Users Works' }));

module.exports = router;