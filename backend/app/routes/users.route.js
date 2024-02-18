const Users = require('../controllers/users.controller');

module.exports = [
  {
    method: 'GET',
    url: '/api/users/get/all',
    handler: Users.getAllUsers,
  },
  {
    method: 'POST',
    url: '/api/users/login',
    handler: Users.login,
  },
];