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
