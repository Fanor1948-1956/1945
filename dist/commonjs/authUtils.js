"use strict";

var jwt = require('jsonwebtoken');
var SECRET_KEY = 'mi-clave-secreta';
var generateToken = function generateToken(user) {
  var token = jwt.sign({
    userId: user._id,
    email: user.email,
    roles: user.roles
  }, SECRET_KEY, {
    expiresIn: '5h'
  });
  return token;
};
module.exports = {
  generateToken: generateToken
};