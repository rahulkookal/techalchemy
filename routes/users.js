const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('./../models')
const generateToken = require('../lib/generate-jwt-token')

/* POST create new user */
router.post('/register', async function(req, res, next) {
  const { first_name, last_name, email, password } = req.body
  const hash = await bcrypt.hash(password, 10);
  const user = User.build({ firstName: first_name, lastName: last_name, password: hash, email: email });
  await user.save();
  res.send(user);
});

/* POST login user */
router.post('/login', async function(req, res, next) {
  try {
  const { email, password } = req.body
  if(!email || !password) throw new Error('Email & Password required')

  const user = await User.findOne({
    where: {
      email: email
    }
  })

  const match = await bcrypt.compare(password, user.password)

  if( match ) {
    user.token = await generateToken({ email: user.email })
    // TODO: Token should be stored on cache or highly availabe systems like fir verification
    // memcache or redis server
    await user.save()
    res.send({token: user.token })
  } else {
    throw new Error('Invalid Login')
  }

  } catch (error) {
    res.status(400).json(error.message)
  }  
});

/* POST create new user */
router.post('/logout', async function(req, res, next) {
  try {
    const { authorization } = req.headers
    if (!authorization) throw new Error('You must send an Authorization header')
    const [authType, token] = authorization.trim().split(' ')
    if (authType !== 'Bearer') throw new Error('Expected a Bearer token')
    const user = await User.findOne({
      where: {
        token: token
      }
    })
    // 
    if (user == null) throw new Error('User already logged out')

    user.token = null
    await user.save()
    res.send('User loged out')
  } catch (error) {
    res.status(401).json(error.message)
  }
});

module.exports = router;
