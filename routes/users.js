var express = require('express');
var router = express.Router();
const { User } = require('./../models')

/* POST create new user */
router.post('/register', async function(req, res, next) {
  const user = User.build({ firstName: 'Jane', lastName: 'Doe' });
  await user.save();
  res.send(user);
});

module.exports = router;
