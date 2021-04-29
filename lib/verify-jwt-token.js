const jwt = require('jsonwebtoken')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const {
  User
} = require('./../models')

const verifyAccessToken = async (req, res, next) => {
  try {
    const {
      authorization
    } = req.headers
    if (!authorization) throw new Error('You must send an Authorization header')
    const [authType, token] = authorization.trim().split(' ')
    if (authType !== 'Bearer') throw new Error('Expected a Bearer token')
    jwt.verify(token, config.secret_key, async function (err, claims) {
      if (err) throw res.status(401).json(err)
      // TODO: This check user query should be from highly availabe systems like
      // memcache or redis server
      const user = await User.findOne({
        where: {
          email: claims.email
        }
      })
      if (user.token === token) {
        next()
      } else {
        throw new Error('Please login to access the resource')
      }
    })
  } catch (error) {
    res.status(401).json(error.message)
  }
}

module.exports = verifyAccessToken
