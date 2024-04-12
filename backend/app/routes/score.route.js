const Scores = require('../controllers/score.controller');
const { jwtVerify } = require('../utils/jwtVerify');

module.exports = [
  {
    method: 'GET',
    url: '/api/score/get/top',
    handler: Scores.getTopScore,
    preHandler: jwtVerify,
  },
];
