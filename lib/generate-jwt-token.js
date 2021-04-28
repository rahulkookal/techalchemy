const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const generateToken = async (user) => {    
 return token = jwt.sign(user, config.secret_key)
}
module.exports = generateToken;