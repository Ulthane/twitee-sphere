const Communities = require('../controllers/communities.controller');
const { jwtVerify } = require('../utils/jwtVerify');

module.exports = [
  {
    method: 'GET',
    url: '/api/communities/get',
    handler: Communities.getCommunitiesWithOffset,
    preHandler: jwtVerify,
  },
  {
    method: 'GET',
    url: '/api/communities/get/:name',
    handler: Communities.getCommunitiesByName,
    preHandler: jwtVerify
  },
  {
    method: 'POST',
    url: '/api/communities/create',
    handler: Communities.createCommunities,
    preHandler: jwtVerify,
  },
  {
    method: 'PUT',
    url: '/api/communities/modify/:id',
    handler: Communities.modifyCommunities,
    preHandler: jwtVerify,
  },
  {
    method: 'DELETE',
    url: '/api/communities/delete/:id',
    handler: Communities.deleteCommunities,
    preHandler: jwtVerify,
  },
];
