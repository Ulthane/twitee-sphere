const jwt = require('jsonwebtoken');

module.exports.createSecretToken = (users) => {
  return jwt.sign({ users: users }, process.env.TOKEN_KEY, {
    expiresIn: 24 * 60 * 60,
  });
};