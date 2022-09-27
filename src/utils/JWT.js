require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const tokenSecret = process.env.JWT_SECRET;

const generateToken = async (payload) => jwt.sign(payload, tokenSecret, jwtConfig);

const authTokenValidation = async (token) => jwt.verify(token, tokenSecret);

module.exports = {
  generateToken,
  authTokenValidation,
};