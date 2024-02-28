const Comentaries = require('../controllers/comentaries.controller');
const { jwtVerify } = require('../utils/jwtVerify');

module.exports = [
  {
    method: 'GET',
    url: '/api/comentaries/get',
    handler: Comentaries.getComentariesWithOffset,
    preHandler: jwtVerify,
  },
  {
    method: 'POST',
    url: '/api/comentaries/create',
    handler: Comentaries.createComentaries,
    preHandler: jwtVerify,
  },
  {
    method: 'PUT',
    url: '/api/comentaries/modify/:id',
    handler: Comentaries.modifyComentaries,
    preHandler: jwtVerify,
  },
  {
    method: 'DELETE',
    url: '/api/comentaries/delete/:id',
    handler: Comentaries.deleteComentaries,
    preHandler: jwtVerify,
  },
];
