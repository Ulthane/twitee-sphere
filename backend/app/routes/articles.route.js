const Articles = require('../controllers/articles.controller');
const { jwtVerify } = require('../utils/jwtVerify');

module.exports = [
  {
    method: 'GET',
    url: '/api/articles/get',
    handler: Articles.getArticlesWithOffset,
    preHandler: jwtVerify,
  },
  {
    method: 'GET',
    url: '/api/articles/get/:id',
    handler: Articles.getArticlesWithOffsetAndUserId,
    preHandler: jwtVerify,
  },
  {
    method: 'POST',
    url: '/api/articles/get/multiple',
    handler: Articles.getArticlesWithOffsetAndMultipleUserId,
    preHandler: jwtVerify,
  },
  {
    method: 'POST',
    url: '/api/articles/create',
    handler: Articles.createArticles,
    preHandler: jwtVerify,
  },
  {
    method: 'PUT',
    url: '/api/articles/modify/:id',
    handler: Articles.modifyArticles,
    preHandler: jwtVerify,
  },
  {
    method: 'DELETE',
    url: '/api/articles/delete/:id',
    handler: Articles.deleteArticles,
    preHandler: jwtVerify,
  },
];
