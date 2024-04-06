const Friends = require('../controllers/friends.controller');
const { jwtVerify } = require('../utils/jwtVerify');

module.exports = [
  {
    method: 'POST',
    url: '/api/friends/create',
    handler: Friends.createFriends,
    preHandler: jwtVerify,
  },
  {
    method: 'DELETE',
    url: '/api/friends/delete',
    handler: Friends.removeFriends,
    preHandler: jwtVerify,
  }
];
