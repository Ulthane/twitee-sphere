const Likes = require('../controllers/likes.controller');
const { jwtVerify } = require('../utils/jwtVerify');

module.exports = [
  {
    method: 'GET',
    url: '/api/likes/get/:id',
    handler: Likes.getLikesCount,
    preHandler: jwtVerify,
  },
  {
    method: 'GET',
    url: '/api/likes/get/user',
    handler: Likes.getLikesByUser,
    preHandler: jwtVerify,
  },
  {
    method: 'GET',
    url: '/api/likes/get/community/:id',
    handler: Likes.getLikesCountByCommunity,
    preHandler: jwtVerify,
  },
  {
    method: 'POST',
    url: '/api/likes/create',
    handler: Likes.createLikes,
    preHandler: jwtVerify,
  },
  {
    method: 'DELETE',
    url: '/api/likes/delete/:id',
    handler: Likes.deleteLikes,
    preHandler: jwtVerify,
  },
];
