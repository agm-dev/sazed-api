const jwt = require('jsonwebtoken');
const vars = require('../config/vars');

exports.generateJWT = (userId, payload = {}) => {
  if (!userId) {
    throw new Error('need user id to generate JWT');
  }

  // TODO: get user data? from database? form social login?

  const jwtOptions = {
    expiresIn: '1 hour',
    audience: vars.jwt.audience,
    issuer: vars.jwt.issuer,
    subject: userId.toString(),
  };

  return jwt.sign(payload, vars.jwt.secret, jwtOptions);
};
