const Users = require('../controllers/users.controller');
const { jwtVerify } = require('../utils/jwtVerify');

module.exports = [
  {
    method: 'GET',
    url: '/api/users/get/all',
    handler: Users.getAllUsers,
    preHandler: jwtVerify
  },
  {
    method: 'GET',
    url: '/api/users/get/id',
    handler: Users.getUsersById,
    preHandler: jwtVerify
  },
  {
    method: 'GET',
    url: '/api/users/get/other/:id',
    handler: Users.getFriendById,
    preHandler: jwtVerify
  },
  {
    method: 'GET',
    url: '/api/users/get/:username',
    handler: Users.getUsersByName,
    preHandler: jwtVerify
  },
  {
    method: 'PUT',
    url: '/api/users/modify',
    handler: Users.modifyUser,
    preHandler: jwtVerify
  },
  {
    method: 'POST',
    url: '/api/users/signin',
    handler: Users.signIn
  },
  {
    method: 'POST',
    url: '/api/users/signup',
    handler: Users.signUp
  },
];
